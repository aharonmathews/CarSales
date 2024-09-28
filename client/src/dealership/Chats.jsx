// Chat.jsx
import React, { useEffect, useState } from 'react';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Ensure you're importing auth from firebase
import { onAuthStateChanged } from 'firebase/auth';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Fetch list of users (this can be dynamic based on your application logic)
  useEffect(() => {
    const mockUsers = [
      { id: 'user1', name: 'John Doe' },
      { id: 'user2', name: 'Jane Smith' },
      { id: 'user3', name: 'Alice Brown' },
    ];
    setUsers(mockUsers);
  }, []);

  // Fetch messages from Firebase for the selected user
  useEffect(() => {
    if (!selectedUser || !currentUser) return; // Check for selectedUser and currentUser

    const q = query(
      collection(db, 'messages'),
      where('users', 'array-contains', selectedUser.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
    return unsubscribe;
  }, [selectedUser, currentUser]);

  const sendMessage = async () => {
    if (newMessage.trim() === '' || !selectedUser || !currentUser) return;

    await addDoc(collection(db, 'messages'), {
      users: [currentUser.uid, selectedUser.id],
      message: newMessage,
      timestamp: new Date(),
    });

    setNewMessage('');
  };

  if (!currentUser) {
    return <p>Please log in to chat.</p>; // Show a message if not logged in
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar for User List */}
      <div className="w-1/4 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Chats</h2>
        </div>
        <div className="p-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={`mb-2 p-2 rounded cursor-pointer ${
                selectedUser?.id === user.id ? 'bg-green-200' : 'bg-green-100'
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
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
                    {msg.users.includes(currentUser.uid) ? 'You' : selectedUser.name}
                  </div>
                  <div className="text-md bg-gray-200 p-2 rounded">{msg.message}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No messages yet. Start chatting!</p>
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
  );
}

export default Chat;
