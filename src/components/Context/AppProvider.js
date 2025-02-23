import React, { useState } from 'react';
import { AuthContext } from './AuthProvider';
import useFirestore from '~/hooks/useFirestore';

export const AppContext = React.createContext();

function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    const {
        user: { uid },
    } = React.useContext(AuthContext);

    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        };
    }, [uid]);

    const rooms = useFirestore('rooms', roomsCondition);

    const selectedRoom = React.useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId],
    );

    const userCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        };
    }, [selectedRoom.members]);

    const members = useFirestore('users', userCondition);

    return (
        <AppContext.Provider
            value={{
                rooms,
                members,
                selectedRoom,
                isAddRoomVisible,
                setIsAddRoomVisible,
                selectedRoomId,
                setSelectedRoomId,
                isInviteMemberVisible,
                setIsInviteMemberVisible,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
