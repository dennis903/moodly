import NavigationBarPresenterModule from './presenter/module/NavigationBar.presenter.module';
import {type FC} from 'react';

const NavigationBarContainer: FC = () => {
  const navData = [
    {
      link: '/today',
      icon: 'Pencil',
      label: '오늘'
    },
    {
      link: '/calendar',
      icon: 'Grid3X3',
      label: '캘린더'
    },
    {
      link: '/timeline',
      icon: 'List',
      label: '타임라인'
    },
    {
      link: '/statistics',
      icon: 'ChartNoAxesColumn',
      label: '통계'
    },
    {
      link: '/settings',
      icon: 'Settings',
      label: '설정'
    }
  ];

  const vProps = {
    navData
  };

  return <NavigationBarPresenterModule {...vProps} />;
};

export default NavigationBarContainer;
