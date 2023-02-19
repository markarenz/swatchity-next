import { render } from '@testing-library/react';
import IconAdmin from '@/components/icons/IconAdmin';
import IconAlerts from '@/components/icons/IconAlerts';
import IconHome from '@/components/icons/IconHome';
import IconLike from '@/components/icons/IconLike';
import IconMessages from '@/components/icons/IconMessages';
import IconNew from '@/components/icons/IconNew';
import IconNews from '@/components/icons/IconNews';
import IconReply from '@/components/icons/IconReply';
import IconSearch from '@/components/icons/IconSearch';
import IconThread from '@/components/icons/IconThread';

describe('Icons - all', () => {
  const allIcons = [
    {
      label: 'IconAdmin',
      icon: IconAdmin,
    },
    {
      label: 'IconAlerts',
      icon: IconAlerts,
    },
    {
      label: 'IconHome',
      icon: IconHome,
    },
    {
      label: 'IconLike',
      icon: IconLike,
    },
    {
      label: 'IconMessages',
      icon: IconMessages,
    },
    {
      label: 'IconNew',
      icon: IconNew,
    },
    {
      label: 'IconNews',
      icon: IconNews,
    },
    {
      label: 'IconReply',
      icon: IconReply,
    },
    {
      label: 'IconSearch',
      icon: IconSearch,
    },
    {
      label: 'IconThread',
      icon: IconThread,
    },
  ];
  allIcons.map((item) => {
    it(`${item.label}: renders unfilled icon`, () => {
      render(<item.icon color="red" colorDark="yellow" filled={false} />);
      const element = document.querySelector('g');
      expect(element).toBeInTheDocument();
    });
    it(`${item.label}: renders filled icon`, () => {
      render(<item.icon color="red" colorDark="yellow" filled={true} />);
      const element = document.querySelector('g');
      expect(element).toBeInTheDocument();
    });
  });
});
