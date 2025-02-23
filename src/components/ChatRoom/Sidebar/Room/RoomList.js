import React, { useState, useContext } from 'react';
import styles from '~/components/ChatRoom/Sidebar/Room/RoomList.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '~/components/Context/AppProvider'; // Import AppContext đúng

const cx = classNames.bind(styles);

function RoomList() {
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext); // Sử dụng useContext đúng

    const [isOpen, setIsOpen] = useState(true); // Thêm useState cho toggle

    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    };
    return (
        <div className={cx('room-container')}>
            <button className={cx('collapse-button')} onClick={() => setIsOpen(!isOpen)}>
                <span>Danh sách các phòng</span>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </button>
            {isOpen && (
                <div className={cx('room-list')}>
                    {Array.isArray(rooms) ? (
                        rooms.map((room) => (
                            <div
                                className={cx('room-link')}
                                key={room.id}
                                onClick={() => setSelectedRoomId(room.id)}
                            >
                                {room.name}
                            </div>
                        ))
                    ) : (
                        <p>Đang tải danh sách phòng hoặc không có phòng nào...</p>
                    )}
                    <button className={cx('add-room')} onClick={handleAddRoom}>
                        <FontAwesomeIcon icon={faPlusSquare} /> Thêm phòng
                    </button>
                </div>
            )}
        </div>
    );
}

export default RoomList;
