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

export const generateKeywords = (displayName) => {
    const name = displayName
        .toLowerCase()
        .split(' ')
        .filter((word) => word);
    const length = name.length;
    let flagArray = [];
    let result = [];
    let stringArray = [];

    // Khởi tạo mảng flag để đánh dấu từ đã được dùng chưa
    for (let i = 0; i < length; i++) {
        flagArray[i] = false;
    }

    // Hàm tạo danh sách tiền tố (prefixes) của một từ
    const createKeywords = (name) => {
        const arrName = [];
        let curName = '';
        name.split('').forEach((letter) => {
            curName += letter;
            arrName.push(curName);
        });
        return [
            ...arrName,
            ...arrName.map((w) => w.toLowerCase()),
            ...arrName.map((w) => w.toUpperCase()),
        ];
    };

    // Hàm tạo tất cả hoán vị của các từ trong họ tên
    function findPermutation(k) {
        for (let i = 0; i < length; i++) {
            if (!flagArray[i]) {
                flagArray[i] = true;
                result[k] = name[i];

                if (k === length - 1) {
                    stringArray.push(result.join(' '));
                }

                findPermutation(k + 1);
                flagArray[i] = false;
            }
        }
    }

    findPermutation(0);

    // Tạo danh sách keywords từ tất cả permutation
    const keywords = stringArray.reduce((acc, cur) => {
        const words = createKeywords(cur);
        return [...acc, ...words];
    }, []);

    // Bổ sung phiên bản chữ hoa chữ cái đầu để tìm kiếm chính xác hơn
    const capitalizedKeywords = keywords.map(
        (keyword) => keyword.charAt(0).toUpperCase() + keyword.slice(1),
    );

    // Hợp nhất hai danh sách: chữ thường + chữ hoa chữ cái đầu
    return [...new Set([...keywords, ...capitalizedKeywords])];
};
