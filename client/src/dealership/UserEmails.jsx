import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';  // Adjust the path if needed

function UserEmails() {
  const [emails, setEmails] = useState([]);

  // Fetch user emails from the 'userInfo' collection
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const userCollection = collection(db, 'userInfo');
        const userSnapshot = await getDocs(userCollection);
        const emailList = userSnapshot.docs.map(doc => doc.id); // Fetching document IDs (emails in your case)
        setEmails(emailList); // Set emails into state
        console.error('1');
      } catch (error) {
        console.error('Error fetching emails: ', error);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">List of User Emails</h2>
      <ul className="list-disc ml-6 mt-2">
        {emails.length > 0 ? (
          emails.map((email, index) => <li key={index}>{email}</li>)
        ) : (
          <p>Loading emails...</p>
        )}
      </ul>
    </div>
  );
}

export default UserEmails;
