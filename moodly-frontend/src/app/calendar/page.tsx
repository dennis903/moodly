import CalendarContainer from '@/containers/Calendar/Calendar.container';
import NavigationBarContainer from '@/containers/NavigationBar/NavigationBar.container';
import {type FC} from 'react';

const CalendarPage: FC = () => {
  return (
    <>
      <CalendarContainer />
      <NavigationBarContainer />
    </>
  );
};

export default CalendarPage;
