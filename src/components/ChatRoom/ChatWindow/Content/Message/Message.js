import React from 'react';
import styles from '~/components/ChatRoom/ChatWindow/Content/Message/Message.module.scss';
import classNames from 'classnames/bind';
import { formatRelative } from 'date-fns';
const cx = classNames.bind(styles);

function Message({ text, displayName, createdAt, photoURL }) {
    function formatDate(seconds) {
        let formattedDate = '';

        if (seconds) {
            formattedDate = formatRelative(new Date(seconds * 1000), new Date());

            formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }

        return formattedDate;
    }

    return (
        <div className={cx('messageContainer')}>
            <div className={cx('avatarWrapper')}>
                <div className={cx('avatar')}>
                    <img src={photoURL} alt="" />
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </div>
                <div className={cx('messageHeader')}>
                    <strong className={cx('author')}>{displayName}</strong>
                    <time className={cx('timestamp')}>{formatDate(createdAt?.seconds)}</time>
                </div>
            </div>
            <p className={cx('contents')}>{text}</p>
        </div>
    );
}

export default Message;
