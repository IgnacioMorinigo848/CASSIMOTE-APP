// useNetworkGuard.js
import NetInfo from '@react-native-community/netinfo';
import { useState, useEffect } from 'react';

export default function useNetworkGuard() {
  const [isConnected, setIsConnected] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  const checkConnection = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);
    setIsChecking(false);
  };

  useEffect(() => {
    checkConnection();
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const retryConnection = () => {
    setIsChecking(true);
    checkConnection();
  };

  return { isConnected, retryConnection, isChecking };
}
