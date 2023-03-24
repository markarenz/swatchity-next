import Image from 'next/image';
import Link from 'next/link';
import TimeSince from './TimeSince';
import IconLink from '../icons/IconLink';
import { PostSummary } from '@/types';

type Props = {
  post: PostSummary;
};

const NewsListItem: React.FC<Props> = ({ post }) => {
  const bgColor = `rgb(${post.colorR}, ${post.colorG}, ${post.colorB})`;
  return (
    <Link
      href={`/news/${post.slug}`}
      aria-label="view post"
      prefetch={false}
      className="text-link text-link-no-underline hover-group"
    >
      <div className="py-1 px-1 round-1 mb-2 relative" style={{ backgroundColor: bgColor }}>
        <div className="absolute w-full h-full top-0 left-0 bg-gray-7 round-1 group-hover-opacity-in" />
        <div className="flex items-center gap-1 relative">
          <img
            src={post.imgThumbnail}
            alt={post.title}
            className="round w-3 h-3 border-1 dark-border-gray-2 border-gray-5 group-hover-zoom"
          />
          <div className="flex-grow">
            <span className="mr-0-5 text-gray-1">{post.title}</span>
            <span className="mr-0-5 text-gray-1">&#183;</span>
            <span className="text-gray-1">
              <TimeSince inputDate={new Date(post.publishDate)} />
            </span>
          </div>
          <div>
            <div className="group-hover-zoom h-4 w-4 py-1 px-1 round">
              <IconLink color="gray-1" colorDark="gray-2" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsListItem;
