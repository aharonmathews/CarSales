import React, { useEffect, useState } from 'react';
import { collection, addDoc, query, where, onSnapshot, getDocs, doc, orderBy, updateDoc, limit } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';

function Chats() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCounts, setUnreadCounts] = useState({});
  const [lastMessageTimes, setLastMessageTimes] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const userCollection = collection(db, 'userInfo');
        const userSnapshot = await getDocs(userCollection);
        const emailList = userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(emailList);
        setFilteredUsers(emailList);
      } catch (error) {
        console.error('Error fetching emails: ', error);
      }
    };

    fetchEmails();
  }, []);

  const getChatId = (user1, user2) => {
    return [user1.email, user2.id].sort().join('_');
  };

  useEffect(() => {
    if (!currentUser) return;

    const fetchUnreadMessagesAndSortUsers = async () => {
      try {
        const unreadCountsTemp = {};
        const lastMessageTimesTemp = {};
        const sortedUsers = await Promise.all(
          users
            .filter((user) => user.id !== currentUser?.email)
            .map(async (user) => {
              const chatId = getChatId(currentUser, user);
              const messagesRef = collection(db, 'chats', chatId, 'messages');
              
              const unreadQuery = query(
                messagesRef,
                where('is_read', '==', false),
                where('to', '==', currentUser.email)
              );
              const unreadSnapshot = await getDocs(unreadQuery);
              unreadCountsTemp[user.id] = unreadSnapshot.size;

              const lastMessageQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
              const lastMessageSnapshot = await getDocs(lastMessageQuery);
              if (!lastMessageSnapshot.empty) {
                lastMessageTimesTemp[user.id] = lastMessageSnapshot.docs[0].data().timestamp.toDate();
              } else {
                lastMessageTimesTemp[user.id] = null;
              }

              return user;
            })
        );

        setUnreadCounts(unreadCountsTemp);
        setLastMessageTimes(lastMessageTimesTemp);

        const sortedFilteredUsers = sortedUsers.sort((a, b) => {
          const timeA = lastMessageTimesTemp[a.id];
          const timeB = lastMessageTimesTemp[b.id];
          return timeB - timeA;
        });

        setFilteredUsers(sortedFilteredUsers);
      } catch (error) {
        console.error('Error fetching unread messages or sorting users:', error);
      }
    };

    fetchUnreadMessagesAndSortUsers();
  }, [users, currentUser]);

  const markMessagesAsRead = async (selectedUser) => {
    const chatId = getChatId(currentUser, selectedUser);
    const messagesRef = collection(db, 'chats', chatId, 'messages');

    const unreadMessagesQuery = query(
      messagesRef,
      where('is_read', '==', false),
      where('to', '==', currentUser.email)
    );

    const unreadSnapshot = await getDocs(unreadMessagesQuery);
    const batchPromises = unreadSnapshot.docs.map((doc) =>
      updateDoc(doc.ref, { is_read: true })
    );

    await Promise.all(batchPromises);
    setUnreadCounts((prev) => ({ ...prev, [selectedUser.id]: 0 }));
  };

  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const chatId = getChatId(currentUser, selectedUser);
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    }, (error) => {
      console.error('Error listening to Firestore messages collection:', error);
    });

    markMessagesAsRead(selectedUser);

    return unsubscribe;
  }, [selectedUser, currentUser]);

  const sendMessage = async () => {
    if (newMessage.trim() === '' || !selectedUser || !currentUser) return;

    const chatId = getChatId(currentUser, selectedUser);
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const messageData = {
      from: currentUser.email,
      to: selectedUser.id,
      message: newMessage,
      timestamp: new Date(),
      is_read: false,
    };

    try {
      await addDoc(messagesRef, messageData);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

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
      <Navbar />

      <div className="flex flex-1">
        {/* Left Sidebar for User List */}
        <div className="w-1/4 bg-white shadow-md flex flex-col overflow-hidden">
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
                className={`mb-2 p-2 rounded cursor-pointer ${selectedUser?.id === user.id ? 'bg-green-200' : 'bg-green-100'}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex justify-between">
                  <span>{user.id}</span>
                  {unreadCounts[user.id] > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {unreadCounts[user.id]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="w-3/4 flex flex-col justify-between bg-white overflow-hidden">
          {selectedUser && (
            <div className="p-4 bg-gray-200 border-b">
              <h3 className="text-lg font-bold">Chat with {selectedUser.id}</h3>
            </div>
          )}

          <div className="p-4 overflow-y-auto flex-grow">
            {selectedUser ? (
              messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} className="mb-4">
                    <div className="text-sm text-gray-500">
                      {msg.from === currentUser.email ? 'You' : msg.from}
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

          {selectedUser && (
            <div className="p-4 border-t flex">
              <input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
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

export default Chats;
  