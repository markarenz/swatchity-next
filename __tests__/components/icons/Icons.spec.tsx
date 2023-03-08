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
import IconClose from '@/components/icons/IconClose';
import IconAuto from '@/components/icons/IconAuto';
import IconCorrect from '@/components/icons/IconCorrect';
import IconLeft from '@/components/icons/IconLeft';
import IconRight from '@/components/icons/IconRight';
import IconRefresh from '@/components/icons/IconRefresh';
import IconSun from '@/components/icons/IconSun';
import IconLock from '@/components/icons/IconLock';
import IconMoon from '@/components/icons/IconMoon';

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

  it('renders simple icons', () => {
    const simpleIcons = [
      {
        label: 'IconClose',
        icon: IconClose,
      },
      {
        label: 'IconAuto',
        icon: IconAuto,
      },
      {
        label: 'IconCorrect',
        icon: IconCorrect,
      },
      {
        label: 'IconLeft',
        icon: IconLeft,
      },
      {
        label: 'IconRight',
        icon: IconRight,
      },
      {
        label: 'IconRefresh',
        icon: IconRefresh,
      },
      {
        label: 'IconLock',
        icon: IconLock,
      },
      {
        label: 'IconSun',
        icon: IconSun,
      },
      {
        label: 'IconMoon',
        icon: IconMoon,
      },
    ];
    simpleIcons.map((item) => {
      render(<item.icon color="red" colorDark="yellow" />);
      const element = document.querySelector('g');
      expect(element).toBeInTheDocument();
    });
  });
});
