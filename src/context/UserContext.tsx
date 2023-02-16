import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { UserMeta } from '@prisma/client';
import { getUserMeta, createUserMeta } from '@/utils/apiFunctions';

type ContextValue = {
  userMeta: UserMeta | null;
  isNewUser: boolean;
};

const UserContext = createContext({} as ContextValue);

type Props = {
  children: JSX.Element;
  locale: string;
};

export const UserContextProvider: React.FC<Props> = ({ children, locale }) => {
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isInitChecked, setIsInitChecked] = useState(false);
  const [userMeta, setUserMeta] = useState<UserMeta | null>(null);
  const { data: session } = useSession();
  const checkUserMeta = async () => {
    const email = `${session?.user?.email}`;
    const name = `${session?.user?.name}`;
    const userMetaResult = await getUserMeta(email);
    if (userMetaResult) {
      setUserMeta(userMetaResult);
      setIsNewUser(false);
    } else {
      const createUserMetaResult = await createUserMeta(email, name, locale);
      setUserMeta(createUserMetaResult);
      setIsNewUser(true);
    }
  };
  useEffect(() => {
    if (!isSessionLoaded && !isInitChecked && !!session?.user) {
      setIsInitChecked(true);
      setIsSessionLoaded(true);
      checkUserMeta();
    }
    // eslint-disable-next-line
  }, [session]);

  const contextValue = useMemo((): ContextValue => {
    return {
      userMeta,
      isNewUser,
    };
  }, [userMeta, isNewUser]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
