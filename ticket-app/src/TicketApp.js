import React from 'react';
import { UiProvider } from './context/UiContext';
import { RouterPage } from './pages/RouterPage';
import { SocketProvider } from './context/SocketContext';

export const TicketApp = () => {
    return (
        <SocketProvider>
            <UiProvider>
                <RouterPage />
            </UiProvider>
        </SocketProvider>
    )
}
