import React from 'react';
import styles from '~/components/ChatRoom/ChatWindow/Header/Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, Alert } from 'antd';

const cx = classNames.bind(styles);

function Header({ selectedRoom, members = [], maxVisibleAvatars = 2, setIsInviteMemberVisible }) {
    const visibleMembers = members.slice(0, maxVisibleAvatars);
    const hiddenCount = members.length - maxVisibleAvatars;

    if (!selectedRoom || Object.keys(selectedRoom).length === 0) {
        return (
            <Alert message="Hãy chọn phòng" type="info" showIcon style={{ margin: 5 }} closable />
        );
    }
    return (
        <div className={cx('headerInfo')}>
            <p className={cx('headerTitle')}>{selectedRoom.name}</p>
            <span className={cx('headerDes')}>{selectedRoom.description}</span>

            <div>
                <div className={cx('memberList')}>
                    <button
                        className={cx('btnAdd')}
                        type="text"
                        onClick={() => setIsInviteMemberVisible(true)}
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                        Mời
                    </button>

                    <div className={cx('avatarGroup')}>
                        {visibleMembers.map((member, index) => (
                            <Tooltip key={index} title={member.name}>
                                <div
                                    className={cx('avatar')}
                                    style={{ backgroundImage: `url(${member.photoURL})` }}
                                ></div>
                            </Tooltip>
                        ))}
                        {hiddenCount > 0 && (
                            <Tooltip title={`${hiddenCount} người khác`}>
                                <div className={cx('avatar more')}>+{hiddenCount}</div>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
