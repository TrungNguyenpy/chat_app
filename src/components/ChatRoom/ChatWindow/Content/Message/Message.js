import React from 'react';
import styles from '~/components/ChatRoom/ChatWindow/Content/Message/Message.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Message({ text, displayName, createdAt, photoURL }) {
    return (
        <div className={cx('messageContainer')}>
            <div className={cx('avatarWrapper')}>
                <div className={cx('avatar')}>
                    <img src={photoURL} alt="" />
                </div>
                <div className={cx('messageHeader')}>
                    <strong className={cx('author')}>{displayName}</strong>
                    <time className={cx('timestamp')}>{createdAt}</time>
                </div>
            </div>
            <p className={cx('contents')}>{text}</p>
        </div>
    );
}

export default Message;
