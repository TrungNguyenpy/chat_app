import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '~/components/firebase/config';

const useFirestore = (collectionName, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        if (!condition || !condition.compareValue || condition.compareValue.length === 0) {
            setDocuments([]);
            return;
        }

        let collectionRef = collection(db, collectionName); // ✅ Firebase v9: Dùng collection()
        let q = query(collectionRef, orderBy('createdAt')); // ✅ Firebase v9: Dùng query()

        if (condition) {
            q = query(q, where(condition.fieldName, condition.operator, condition.compareValue));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDocuments(docs);
        });

        return () => unsubscribe();
    }, [collectionName, condition]);

    return documents;
};

export default useFirestore;
