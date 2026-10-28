'use client';

import styles from './NavigationBar.module.css';
import classNames from 'classnames/bind';
import {ChartNoAxesColumn, Grid3X3, List, Pencil, Settings} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {type FC} from 'react';

const cx = classNames.bind(styles);

interface INavigationBarPresenterModuleProps {
  navData: {
    label: string;
    icon: string;
    link: string;
  }[];
}

const NavigationBarPresenterModule: FC<INavigationBarPresenterModuleProps> = (props) => {
  const pathname = usePathname();

  return (
    <div className={cx('navigation-bar')}>
      {props.navData.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={cx('navigation-bar__item', {
            'navigation-bar__item--active': pathname === item.link
          })}
        >
          <div className={cx('navigation-bar__icon')}>
            {item.icon === 'Pencil' && <Pencil size={24} />}
            {item.icon === 'Grid3X3' && <Grid3X3 size={24} />}
            {item.icon === 'List' && <List size={24} />}
            {item.icon === 'ChartNoAxesColumn' && <ChartNoAxesColumn size={24} />}
            {item.icon === 'Settings' && <Settings size={24} />}
          </div>
          <p className={cx('navigation-bar__label')}>{item.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default NavigationBarPresenterModule;
