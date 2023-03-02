import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { UserMeta } from '@prisma/client';
import { getUserMeta, createUserMeta } from '@/utils/apiFunctions';
import { ProfileFormFields } from '@/types';

type ContextValue = {
  userMeta: UserMeta | null;
  isNewUser: boolean;
  updateUserMeta: Function;
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
  const updateUserMeta = (formData: ProfileFormFields) => {
    // @ts-ignore
    // eslint-disable-next-line
    setUserMeta((prev) => ({
      ...prev,
      name: formData.name,
      username: formData.username,
      bio: formData.bio,
      avatarPattern: formData.avatarPattern,
      darkMode: formData.darkMode,
      prefLang: formData.prefLang,
      avatarColor1r: formData?.color1?.r,
      avatarColor1g: formData?.color1?.g,
      avatarColor1b: formData?.color1?.b,
      avatarColor2r: formData?.color2?.r,
      avatarColor2g: formData?.color2?.g,
      avatarColor2b: formData?.color2?.b,
      avatarColor3r: formData?.color3?.r,
      avatarColor3g: formData?.color3?.g,
      avatarColor3b: formData?.color3?.b,
    }));
  };
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
      updateUserMeta,
    };
  }, [userMeta, isNewUser]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
