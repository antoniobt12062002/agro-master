import { ReactNode, createContext } from 'react';
import { Socket, io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_APP_URL_ROOT);
export const WebSocketContext = createContext<Socket>(socket);

export default function WebSocketProvider({
  children
}: {
  children: ReactNode;
}) {
  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
}
