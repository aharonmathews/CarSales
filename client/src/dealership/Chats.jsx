import React, { useEffect, useState } from 'react';
import { collection, addDoc, query, where, onSnapshot, getDocs, updateDoc, doc, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Ensure you're importing auth from firebase
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar'; // Import the Navbar component

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadMessages, setUnreadMessages] = useState({}); // For tracking unread messages

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Fetch list of users (user emails from 'userInfo' collection)
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const userCollection = collection(db, 'userInfo');
        const userSnapshot = await getDocs(userCollection);
        const emailList = userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Assuming emails are in the `doc.id`
        setUsers(emailList);
        setFilteredUsers(emailList); // Set filtered users to the full list initially
      } catch (error) {
        console.error('Error fetching emails: ', error);
      }
    };

    fetchEmails();
  }, []);

  // Fetch messages with the selected user
  useEffect(() => {
    if (!selectedUser || !currentUser) return;
  
    console.log('Fetching messages for:', selectedUser.id, currentUser.uid);
  
    const q = query(
      collection(db, 'messages'),
      where('users', 'array-contains', currentUser.uid),
      orderBy('timestamp', 'asc')
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      // Update your UI with the messages here
    }, (error) => {
      console.error("Error listening to Firestore collection:", error);
    });
  
    return unsubscribe;
  }, [selectedUser, currentUser]);
  

  // Mark messages as read when they are viewed
  useEffect(() => {
    if (messages.length > 0) {
      messages.forEach(async (msg) => {
        if (!msg.is_read && msg.users.includes(selectedUser.id)) {
          const msgRef = doc(db, 'messages', msg.id);
          await updateDoc(msgRef, { is_read: true });
        }
      });
    }
  }, [messages, selectedUser]);

  const sendMessage = async () => {
    if (newMessage.trim() === '' || !selectedUser || !currentUser) return;

    await addDoc(collection(db, 'messages'), {
      users: [currentUser.uid, selectedUser.id],
      message: newMessage,
      timestamp: new Date(),
      is_read: false, // Mark new message as unread
    });

    setNewMessage(''); // Clear the message input field
  };

  // Handle user search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  // Handle Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (!currentUser) {
    return <p>Please log in to chat.</p>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar /> {/* Navbar at the top */}

      {/* Chat layout */}
      <div className="flex flex-1">
        {/* Left Sidebar for User List */}
        <div className="w-1/4 bg-white shadow-md flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Chats</h2>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-2 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="p-4 overflow-y-auto flex-grow">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`mb-2 p-2 rounded cursor-pointer ${
                  selectedUser?.id === user.id ? 'bg-green-200' : unreadMessages[user.id] ? 'bg-yellow-200' : 'bg-green-100'
                }`}
                onClick={() => setSelectedUser(user)}
              >
                {user.id}
                {/* Notification badge for unread messages */}
                {unreadMessages[user.id] && (
                  <span className="ml-2 text-sm text-red-500 font-semibold">
                    (New)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="w-3/4 flex flex-col justify-between bg-white">
          {/* Messages Display */}
          <div className="p-4 overflow-y-auto flex-grow">
            {selectedUser ? (
              messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} className="mb-4">
                    <div className="text-sm text-gray-500">
                      {msg.users.includes(currentUser.uid) ? 'You' : selectedUser.id}
                    </div>
                    <div className="text-md bg-gray-200 p-2 rounded">{msg.message}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No messages yet.</p>
              )
            ) : (
              <p className="text-gray-500">Select a user to start chatting.</p>
            )}
          </div>

          {/* Message Input */}
          {selectedUser && (
            <div className="p-4 border-t flex">
              <input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress} // Handle sending message with Enter
                className="flex-grow p-2 border rounded mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
