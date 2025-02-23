import React, { useState } from 'react';
import styles from '~/components/ChatRoom/ChatWindow/Content/Content.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import Message from './Message/Message';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { addDocument } from '~/components/firebase/service';
import { AuthContext } from '~/components/Context/AuthProvider';
import { useContext } from 'react';
import useFirestore from '~/hooks/useFirestore';
const cx = classNames.bind(styles);
function Content({ selectedRoom }) {
    const [inputValue, setInputValue] = useState('');

    const [form] = Form.useForm();

    const {
        user: { uid, photoURL, displayName },
    } = useContext(AuthContext);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Kiểm tra selectedRoom.id trước khi gửi
        if (!selectedRoom || !selectedRoom.id) {
            console.error('Lỗi: selectedRoom.id không tồn tại hoặc chưa được chọn');
            return;
        }

        try {
            await addDocument('messages', {
                text: inputValue.trim(),
                uid,
                photoURL,
                roomId: selectedRoom.id, // Chắc chắn rằng roomId không undefined
                displayName,
            });

            setInputValue('');
            form.resetFields(['message']);
        } catch (error) {
            console.error('Lỗi gửi tin nhắn:', error);
        }
    };

    const condition = React.useMemo(
        () => ({
            fieldName: 'roomId',
            operator: '==',
            compareValue: selectedRoom.id,
        }),
        [selectedRoom.id],
    );

    const messages = useFirestore('messages', condition);

    return (
        <div className={cx('content')}>
            <div className={cx('message')}>
                {messages.length > 0 ? (
                    messages.map((mes) => (
                        <Message
                            key={mes.id}
                            text={mes.text}
                            photoURL={mes.photoURL}
                            displayName={mes.displayName}
                            createdAt={mes.createdAt}
                        />
                    ))
                ) : (
                    <p>Không có tin nhắn nào.</p>
                )}
            </div>

            <Form className={cx('formStyle')} form={form}>
                <Form.Item className={cx('formItem')} name="message">
                    <Input
                        onChange={handleInputChange}
                        onPressEnter={handleOnSubmit}
                        className={cx('formInput')}
                        placeholder="Nhập tin nhắn..."
                        autoComplete="off"
                    />
                </Form.Item>
                <button className={cx('btnSend')} type="submit" onClick={handleOnSubmit}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Gửi
                </button>
            </Form>
        </div>
    );
}

export default Content;
