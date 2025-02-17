import { db } from '~/components/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const addDocument = async (collectionName, data) => {
    try {
        const queryRef = collection(db, collectionName);
        await addDoc(queryRef, {
            ...data,
            createdAt: serverTimestamp(),
        });
        console.log('Document added successfully');
    } catch (error) {
        console.error('Error adding document:', error);
    }
};
