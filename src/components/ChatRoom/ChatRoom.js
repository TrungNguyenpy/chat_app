import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/components/ChatRoom/ChatRoom.module.scss';
import Sidebar from '~/components/ChatRoom/Sidebar/Sidebar.js';
import ChatWindow from '~/components/ChatRoom/ChatWindow/ChatWindow.js';

const cx = classNames.bind(styles);

function ChatRoom() {
    return (
        <div className={cx('chatRoom-container')}>
            <div className={cx('sideBar')}>
                <Sidebar />
            </div>
            <div className={cx('chatWindow')}>
                <ChatWindow />
            </div>
        </div>
    );
}

export default ChatRoom;
