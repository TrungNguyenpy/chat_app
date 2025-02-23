import React, { useContext } from 'react';
import styles from '~/components/ChatRoom/ChatWindow/ChatWindow.module.scss';
import classNames from 'classnames/bind';
import Content from '~/components/ChatRoom/ChatWindow/Content/Content';
import Header from '~/components/ChatRoom/ChatWindow/Header/Header';
import { AppContext } from '~/components/Context/AppProvider';

const cx = classNames.bind(styles);

function ChatWindow() {
    const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);

    return (
        <div className={cx('chatWindow-container')}>
            <img
                className={cx('background-image')}
                src="https://i.pinimg.com/736x/22/fc/42/22fc42f9231c78c31a74fbb586ad7d26.jpg"
                alt="Background"
            />
            <div className={cx('header')}>
                <Header
                    selectedRoom={selectedRoom}
                    members={members}
                    setIsInviteMemberVisible={setIsInviteMemberVisible}
                />
            </div>
            <div className={cx('content')}>
                <Content selectedRoom={selectedRoom} />
            </div>
        </div>
    );
}

export default ChatWindow;
