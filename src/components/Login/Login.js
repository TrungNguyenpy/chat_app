import React from 'react';
import classNames from 'classnames/bind';
import styles from '~/components/Login/Login.module.scss';
import { auth, db } from '../firebase/config';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { addDocument } from '../firebase/service';
import { generateKeywords } from '../firebase/service';

const cx = classNames.bind(styles);

// Khởi tạo provider
const fbProvider = new FacebookAuthProvider();

function Login() {
    const handleGoogleLogin = async () => {};

    const handleFbLogin = async () => {
        try {
            const result = await signInWithPopup(auth, fbProvider);
            const { user } = result;

            console.log('Kết quả đăng nhập:', user);

            // Kiểm tra UID có trong Firestore chưa
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDocument('users', {
                    displayName: user.displayName || 'No Name',
                    email: user.email || 'No Email',
                    uid: user.uid,
                    photoURL: user.photoURL || '',
                    providerId: user.providerData[0]?.providerId || 'unknown',
                    keywords: generateKeywords(user.displayName?.toLowerCase()),
                });

                console.log('Người dùng mới đã được lưu vào Firestore!');
            } else {
                console.log('Người dùng đã tồn tại trong Firestore.');
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập hoặc lưu dữ liệu:', error);
        }
    };
    console.log('Component Login đang render');
    return (
        <div className={cx('login-container')}>
            <h1>Login</h1>
            <div className={cx('social-login')}>
                <button className={cx('google-btn')} onClick={handleGoogleLogin}>
                    Đăng nhập bằng Google
                </button>
                <button className={cx('facebook-btn')} onClick={handleFbLogin}>
                    Đăng nhập bằng Facebook
                </button>
            </div>
        </div>
    );
}

export default Login;
