import React from 'react';
import styles from '~/components/ChatRoom/Sidebar/User/UserInfo.module.scss';
import classNames from 'classnames/bind';
import { auth } from '~/components/firebase/config';

import { AuthContext } from '~/components/Context/AuthProvider';
const cx = classNames.bind(styles);

function UserInfo() {
    const {
        user: { displayName, photoURL },
    } = React.useContext(AuthContext);

    return (
        <div className={cx('user-container')}>
            <div className={cx('user-info')}>
                <img
                    src={photoURL}
                    alt={photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                    className={cx('user-avatar')}
                />
                <div className={cx('user-details')}>
                    <span className={cx('user-name')}>{displayName}</span>
                    <span className={cx('user-status')}>● Online</span>
                </div>
            </div>
            <button
                className={cx('logout-btn')}
                onClick={() => {
                    auth.signOut();
                }}
            >
                Đăng xuất
            </button>
        </div>
    );
}

export default UserInfo;
