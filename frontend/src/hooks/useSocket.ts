import { useEffect, useState } from 'react';
const WS_URL = 'ws://localhost:8000';

export const useSocket = (userName: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?userName=${userName}`);

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);
  return socket;
};