import React from 'react';
import styles from '~/components/ChatRoom/Sidebar/Sidebar.module.scss';
import classNames from 'classnames/bind';
import UserInfo from './User/UserInfo';
import RoomList from './Room/RoomList';
const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <div className={cx('sideBar-container')}>
            <div className={cx('user')}>
                <UserInfo />
            </div>
            <div className={cx('roomList')}>
                <RoomList />
            </div>
        </div>
    );
}

export default Sidebar;
