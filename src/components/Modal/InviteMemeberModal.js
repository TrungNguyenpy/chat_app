import React, { useContext, useState } from 'react';
import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { AppContext } from '../Context/AppProvider';
import { debounce } from 'lodash';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

function DebounceSelect({ fetchOption, debounceTimeout = 300, curMembers, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = async (value) => {
            setOptions([]);
            setFetching(true);
            console.log('Tìm kiếm:', value);

            const newOptions = await fetchOption(value, curMembers);
            console.log('Dữ liệu tìm thấy:', newOptions);

            setOptions(newOptions);
            setFetching(false);
        };
        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOption, curMembers]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : 'Không tìm thấy kết quả'}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size="small" src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}

async function fetchUserList(search, curMembers) {
    if (!search.trim()) return Promise.resolve([]);

    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('keywords', 'array-contains', search.toLowerCase()));

    console.log('🔥 Truy vấn với:', search.toLowerCase());

    const snapshot = await getDocs(q);
    console.log('📦 Tổng số kết quả tìm thấy:', snapshot.size);

    const users = snapshot.docs.map((doc) => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL,
    }));

    console.log('✅ Danh sách kết quả:', users);
    return users.filter((opt) => !curMembers.includes(opt.value));
}

export default function InviteMemberModal() {
    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } =
        useContext(AppContext);

    const [form] = Form.useForm();
    const [value, setValue] = useState([]);
    const handleOk = () => {
        // reset form value
        form.resetFields();
        setValue([]);

        // update members in current room
        const roomRef = doc(db, 'rooms', selectedRoomId);

        updateDoc(roomRef, {
            members: [...selectedRoom.members, ...value.map((val) => val.value)],
        });

        setIsInviteMemberVisible(false);
    };

    const handleCancel = () => {
        // reset form value
        form.resetFields();
        setValue([]);

        setIsInviteMemberVisible(false);
    };

    console.log({ value });

    return (
        <div>
            <Modal
                title="Mời thêm thành viên"
                open={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        name="search-user"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Nhập tên thành viên"
                        fetchOption={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    );
}
