import React, { useState } from 'react';
import { AuthContext } from './AuthProvider';
import useFirestore from '~/hooks/useFirestore';

export const AppContext = React.createContext();

function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
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

    return (
        <AppContext.Provider
            value={{
                rooms,
                isAddRoomVisible,
                setIsAddRoomVisible,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
