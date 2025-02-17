import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyADorVtIEip1i3vWxSdreH-JXaQAh3zoeU',
    authDomain: 'chat-app-a1d4e.firebaseapp.com',
    projectId: 'chat-app-a1d4e',
    storageBucket: 'chat-app-a1d4e.firebasestorage.app',
    messagingSenderId: '23085281928',
    appId: '1:23085281928:web:f99c5c10e12ca7e575253d',
    measurementId: 'G-PRB384GS4T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Use Firebase Emulator in Development
if (window.location.hostname === 'localhost') {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8085);
}

export { app, auth, db, analytics };
