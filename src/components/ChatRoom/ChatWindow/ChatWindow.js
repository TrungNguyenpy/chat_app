import React from 'react';
import styles from '~/components/ChatRoom/ChatWindow/ChatWindow.module.scss';
import classNames from 'classnames/bind';
import Content from '~/components/ChatRoom/ChatWindow/Content/Content';
import Header from '~/components/ChatRoom/ChatWindow/Header/Header';
const cx = classNames.bind(styles);
function ChatWindow() {
    return <div className={cx('chatWindow-container')}>
        <div className={cx('header')}><Header/></div>
        <div className={cx('content')}><Content/></div>
        
    </div>;
}

export default ChatWindow;
