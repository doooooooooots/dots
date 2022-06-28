import { useContext } from 'react';
import { AuthContext } from '../contexts/keystone-context';

export const useAuth = () => useContext(AuthContext);
