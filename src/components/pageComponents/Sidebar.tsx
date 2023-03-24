import Link from 'next/link';
import Sticky from 'react-stickynode';
import { UserMeta, Post, Swatch } from '@prisma/client';
import { FormattedMessage } from 'react-intl';
import { useUserContext } from '@/context/UserContext';
import TimeSince from '../common/TimeSince';
import { getCornerColor, getRGBfromColorObj } from '@/utils/colorFunctions';
import Avatar from '../common/avatar/Avatar';
import styles from '@/styles/modules/sidebar.module.scss';

const Sidebar = () => {
  const { sidebarContent } = useUserContext();
  if (!sidebarContent) {
    return null;
  }
  const { posts, swatches, userMeta } = sidebarContent;
  const getAvatarData = (user: UserMeta) => ({
    avatarPattern: user.avatarPattern,
    avatarColor1r: user.avatarColor1r,
    avatarColor1g: user.avatarColor1g,
    avatarColor1b: user.avatarColor1b,
    avatarColor2r: user.avatarColor2r,
    avatarColor2g: user.avatarColor2g,
    avatarColor2b: user.avatarColor2b,
    avatarColor3r: user.avatarColor3r,
    avatarColor3g: user.avatarColor3g,
    avatarColor3b: user.avatarColor3b,
  });
  return (
    <div
      id="sidebar"
      className="wide-col-sidebar pt-1 pb-12 px-1 bg-gray-4 text-gray-1 border-l-2 border-teal"
    >
      {/* <Sticky enabled={true} top="#sidebarHeader" bottomBoundary="#sidebarFooter"> */}
      {/* bottomBoundary={3000} */}
      <Sticky enabled={true} top={0}>
        <div id="sidebarContent">
          <div className="pb-1">
            <h2 id="sidebarHeader">
              <FormattedMessage id="sidebar__posts__title" />
            </h2>
            <div className="pt-1">
              {posts.map((post: Post) => (
                <Link key={post.id} href={`/news/${post.slug}`} className="text-link">
                  <div className="mb-1 text-gray-1 leading-1-5 dark-text-gray-2">
                    <span className="mr-0-5">{post.title}</span>
                    <span className="mr-0-5">&#183;</span>
                    <TimeSince inputDate={new Date(post.publishDate)} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="pb-1">
            <h2>
              <FormattedMessage id="sidebar__swatches__title" />
            </h2>
            <div className="pt-1">
              {swatches.map((swatch: Swatch) => (
                <Link
                  href={`/swatch/${swatch.id}`}
                  key={swatch.id}
                  aria-label={`Swatch ${swatch.id}`}
                >
                  <div
                    className="mb-1 py-1 px-1 bg-red w-full h-4 relative"
                    style={{
                      backgroundColor: `rgb(${swatch.colorR}, ${swatch.colorG}, ${swatch.colorB})`,
                    }}
                  >
                    <div className={styles.corner}>
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 40 40">
                        <g strokeWidth="0" paintOrder="stroke markers fill">
                          <path className={styles.cornerBG} d="M40 40H0L40 0z"></path>
                          <path
                            d="M0 40V0h40z"
                            style={{
                              fill: getRGBfromColorObj(
                                getCornerColor({
                                  r: swatch.colorR,
                                  g: swatch.colorG,
                                  b: swatch.colorB,
                                }),
                              ),
                            }}
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="pb-12">
            <h2>
              <FormattedMessage id="sidebar__users__title" />
            </h2>
            <div className="pt-1">
              {userMeta.map((user: UserMeta) => (
                <Link
                  href={`/profile/${user.id}`}
                  key={user.id}
                  className="mb-1 text-link text-gray-1 uppercase leading-1-5 dark-text-gray-2"
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 mr-1">
                      <Avatar avatarData={getAvatarData(user)} />
                    </div>
                    <div className="word-break" style={{ width: 'calc(100% - 4rem)' }}>
                      {user.name} ({user.score})
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div id="sidebarFooter">OK</div>
        </div>
      </Sticky>
    </div>
  );
};
export default Sidebar;
