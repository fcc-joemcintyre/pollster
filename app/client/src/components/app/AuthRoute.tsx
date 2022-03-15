import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../data/useAuth';
import { Login } from '../login';

type Props = {
  children: JSX.Element,
};

/**
 * Protected route handler, display login if not authenticated
 * @param children Children to render if authenticated
 * @returns Children or login component
 */
export const AuthRoute = ({ children }: Props) => {
  const navigate = useNavigate ();
  const q = useAuth ();
  const authenticated = q.data?.key !== 0;
  return (authenticated ?
    children :
    <Login onLogin={() => { /* no op */ }} onClose={() => navigate ('/')} />
  );
};
