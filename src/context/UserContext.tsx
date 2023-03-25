import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { UserMeta } from '@prisma/client';
import { useIntl } from 'react-intl';
import { getUserMeta, createUserMeta, getSidebarContent } from '@/utils/apiFunctions';
import { ProfileFormFields, SidebarContent } from '@/types';
import { toast } from 'react-toastify';

type ContextValue = {
  sidebarContent: SidebarContent | null;
  userMeta: UserMeta | null;
  isNewUser: boolean;
  updateUserMeta: Function;
  checkUserMeta: Function;
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
  const [sidebarContent, setSidebarContent] = useState<SidebarContent | null>(null);
  const { formatMessage } = useIntl();
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
      if (!!userMeta?.level && userMetaResult?.level > (userMeta?.level || 1)) {
        toast.info(formatMessage({ id: 'user_level_up' }));
      }
      setUserMeta(userMetaResult);
      setIsNewUser(false);
    } else {
      const createUserMetaResult = await createUserMeta(email, name, locale);
      setUserMeta(createUserMetaResult);
      setIsNewUser(true);
    }
  };
  const getInitialSidebarContent = async () => {
    const newSidebarContent = await getSidebarContent();
    setSidebarContent(newSidebarContent);
  };
  useEffect(() => {
    if (!isSessionLoaded && !isInitChecked && !!session?.user) {
      setIsInitChecked(true);
      setIsSessionLoaded(true);
      checkUserMeta();
    }
    // eslint-disable-next-line
  }, [session]);
  useEffect(() => {
    if (!sidebarContent) {
      getInitialSidebarContent();
    }
  }, [sidebarContent]);

  const contextValue = useMemo((): ContextValue => {
    return {
      userMeta,
      isNewUser,
      sidebarContent,
      updateUserMeta,
      checkUserMeta,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMeta, isNewUser, sidebarContent]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
