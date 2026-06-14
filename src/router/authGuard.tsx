import {Outlet, Navigate} from 'react-router-dom'
import { useAuth } from '../app/hooks/useAuth';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({isPrivate}: AuthGuardProps) {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  if (!isAuthenticated && isPrivate) return <Navigate to="/signin" replace/>
  if(isAuthenticated && !isPrivate) return <Navigate to="/" replace/>
  
  return <Outlet/>
}
