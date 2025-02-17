import React from "react";
import styles from "~/components/ChatRoom/ChatWindow/Header/Header.module.scss";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "antd";

const cx = classNames.bind(styles);

function Header({ members = [ 
{ name: "A", avatar: "https://example.com/avatar1.jpg" },
{ name: "B", avatar: "https://example.com/avatar2.jpg" },
{ name: "C", avatar: "https://example.com/avatar3.jpg" },
{ name: "D", avatar: "https://example.com/avatar4.jpg" },
{ name: "E", avatar: "https://example.com/avatar5.jpg" },], 
maxVisibleAvatars = 2 }) 
{
    const visibleMembers = members.slice(0, maxVisibleAvatars);
    const hiddenCount = members.length - maxVisibleAvatars;

    return (
        <div className={cx('headerInfo')}>
            <p className={cx('headerTitle')}>Room 1</p>
            <span className={cx('headerDes')}>Day la room 1</span>

            <div>
                <div className={cx('memberList')}>
                    <button className={cx('btnAdd')} type="button">
                        <FontAwesomeIcon icon={faUserPlus} />
                        Mời
                    </button>

                    <div className={cx('avatarGroup')}>
                        {visibleMembers.map((member, index) => (
                            <Tooltip key={index} title={member.name}>
                                <div className={cx('avatar')} style={{ backgroundImage: `url(${member.avatar})` }}></div>
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
