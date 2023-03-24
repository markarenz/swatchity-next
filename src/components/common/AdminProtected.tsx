import { useUserContext } from '@/context/UserContext';

type Props = {
  children: JSX.Element;
};
const AdminProtected: React.FC<Props> = ({ children }) => {
  const { userMeta } = useUserContext();
  const isAdmin = !!userMeta?.name && userMeta?.role === 'admin';
  if (!isAdmin) {
    return (
      <div className="contained py-2">
        <h1>Oops. You are not supposed to be here.</h1>
        <h2>You need to be a site administrator to access this page.</h2>
      </div>
    );
  }
  return children;
};

export default AdminProtected;
