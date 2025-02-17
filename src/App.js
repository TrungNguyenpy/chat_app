import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.js';
import ChatRoom from './components/ChatRoom/ChatRoom.js';
import AuthProvider from './components/Context/AuthProvider.js';
import AppProvider from './components/Context/AppProvider.js';
import AddRoomModal from './components/Modal/AddRoomModal.js';
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        <Route path="/" element={<ChatRoom />} />
                    </Routes>
                    <AddRoomModal />
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
