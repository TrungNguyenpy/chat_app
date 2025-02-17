import React from 'react';
import styles from '~/components/ChatRoom/ChatWindow/Content/Content.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import Message from './Message/Message';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Content() {
    return (
        <div className={cx('content')}>
            <div className={cx('message')}>
                <Message text="test" photoURL={null} displayName="Trung23" createdAt={1212121212} />
                <Message
                    text="test12"
                    photoURL={null}
                    displayName="Trung43"
                    createdAt={1212121212}
                />
                <Message
                    text="test234"
                    photoURL={null}
                    displayName="Trung11"
                    createdAt={1212121212}
                />
                <Message
                    text="test345"
                    photoURL={null}
                    displayName="Trung43"
                    createdAt={1212121212}
                />
            </div>
            <Form className={cx('formStyle')}>
                <Form.Item className={cx('formItem')}>
                    <Input
                        className={cx('formInput')}
                        placeholder="Nhập tin nhắn..."
                        autoComplete="off"
                    />
                </Form.Item>
                <button className={cx('btnSend')} type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Gửi
                </button>
            </Form>
        </div>
    );
}

export default Content;
