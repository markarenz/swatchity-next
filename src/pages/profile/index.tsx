import { useState, useEffect } from 'react';
import Layout from '@/components/pageComponents/Layout';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import { PageMeta, ProfileFormFields } from '@/types';
import { subNavLinksFeed } from '@/constants';
import { useUserContext } from '@/context/UserContext';
import { validateWithRules } from '@/utils/validationFunctions';
import { isPatternValidForUser, checkDirty } from '@/utils/profileFunctions';
import { profileEditRules } from '@/validation/profileEditRules';
import { updateUserProfile } from '@/utils/apiFunctions';
import ProfilePerfLang from '@/components/profile/ProfilePerfLang';
import ProfileBioEdit from '@/components/profile/ProfileBioEdit';
import ProfileDarkMode from '@/components/profile/ProfileDarkMode';
import ProfileName from '@/components/profile/ProfileName';
import ProfileUsername from '@/components/profile/ProfileUsername';
import ProfileAvatarEdit from '@/components/profile/ProfileAvatarEdit';

export default function Profile() {
  const { formatMessage } = useIntl();
  const { userMeta, updateUserMeta } = useUserContext();
  const [formData, setFormData] = useState<ProfileFormFields | null>(null);
  const subNavData = subNavLinksFeed;
  useEffect(() => {
    if (!formData && !!userMeta) {
      setFormData({
        name: userMeta.name,
        username: userMeta.username,
        usernameUnique: true,
        bio: userMeta.bio,
        avatarPattern: userMeta.avatarPattern,
        color1: {
          r: userMeta.avatarColor1r,
          g: userMeta.avatarColor1g,
          b: userMeta.avatarColor1b,
        },
        color2: {
          r: userMeta.avatarColor2r,
          g: userMeta.avatarColor2g,
          b: userMeta.avatarColor2b,
        },
        color3: {
          r: userMeta.avatarColor3r,
          g: userMeta.avatarColor3g,
          b: userMeta.avatarColor3b,
        },
        darkMode: userMeta.darkMode,
        prefLang: userMeta.prefLang,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMeta]);
  const isDirty = checkDirty(formData, userMeta);
  const handleOK = async () => {
    if (isDirty) {
      const success = await updateUserProfile(formData, `${userMeta?.email}`);
      if (success) {
        updateUserMeta(formData);
        toast.info(formatMessage({ id: 'profile_edit__save__success' }));
      } else {
        toast.error(formatMessage({ id: 'profile_edit__save__error' }));
      }
    }
  };

  const pageMeta: PageMeta = {
    title: formatMessage({ id: 'page_meta__profile__title' }),
    metadesc: formatMessage({ id: 'page_meta__profile__metadesc' }),
  };
  const defaultColor = { r: 150, g: 150, b: 150 };
  const isPatternValid = isPatternValidForUser(formData?.avatarPattern, userMeta?.level);
  const isValid = !formData
    ? false
    : isDirty && isPatternValid && validateWithRules(formData, profileEditRules);
  return (
    <Layout pageMeta={pageMeta} subNavData={subNavData}>
      <div className="contained py-2">
        <h1 className="pb-2">
          <FormattedMessage id="feed__profile__title" values={{ name: formData?.name }} />
        </h1>
        {!userMeta ? (
          <div>Loading</div>
        ) : (
          <form
            className="py-2 px-2 bg-gray-2 dark-bg-gray-5 round-0-5 border-1 border-gray-4 dark-border-gray-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            data-testid="profile-form"
          >
            <div className="grid">
              <div className="grid-row grid-row-2 pb-2">
                <div className="pb-1">
                  <ProfileName name={`${formData?.name}`} setFormData={setFormData} />
                </div>
                <div className="pb-1">
                  <ProfileUsername username={`${formData?.username}`} setFormData={setFormData} />
                </div>
              </div>

              <div className="grid-row grid-row-2">
                <div className="pb-1">
                  <ProfilePerfLang perfLang={`${formData?.prefLang}`} setFormData={setFormData} />
                </div>

                <div className="pb-1">
                  <ProfileDarkMode darkMode={`${formData?.darkMode}`} setFormData={setFormData} />
                </div>
              </div>
              <div className="pb-2">
                <p>
                  <em>
                    <FormattedMessage id="profile_edit__language__explainer" />{' '}
                    <a href="mailto:swatchityweb@gmail.com" className="inline text-link">
                      swatchityweb@gmail.com
                    </a>
                    .
                  </em>
                </p>
              </div>

              <div className="pb-2">
                <ProfileAvatarEdit
                  avatarPattern={formData?.avatarPattern || 0}
                  isPatternValid={isPatternValid}
                  color1={formData?.color1 || defaultColor}
                  color2={formData?.color2 || defaultColor}
                  color3={formData?.color3 || defaultColor}
                  setFormData={setFormData}
                />
              </div>

              <div className="pb-2">
                <ProfileBioEdit bio={`${formData?.bio}`} setFormData={setFormData} />
              </div>

              <div>
                <div className="flex justify-right w-full">
                  {isValid && (
                    <button onClick={handleOK} className="btn btn-primary" data-testid="profile-ok">
                      <FormattedMessage id="btn_ok" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}
