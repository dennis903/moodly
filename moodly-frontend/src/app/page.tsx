import styles from './page.module.css';
import classNames from 'classnames/bind';
import Image from 'next/image';
import {type FC} from 'react';

const cx = classNames.bind(styles);

const Home: FC = () => {
  return (
    <div className={cx('home')}>
      <div className={cx('main-header')}>
        <h1 className={cx('title')}>오늘의 기분, 기록해볼까요?</h1>
        <h2 className={cx('subtitle')}>귀여운 감정 캐릭터와 함께 매일 1분, 나를 이해하는 일기</h2>
      </div>
      <div className={cx('main-buttons')}>
        <button type="button" className={cx('start-button')}>
          무료로 시작하기
        </button>
        <p className={cx('browse-without-signup')}>가입없이 둘러보기</p>
      </div>
      <Image src="/images/main-icons.png" alt="main-icons" width={500} height={500} />
      <div className={cx('description-container')}>
        <h2 className={cx('main-description-title')}>이렇게 기록해요</h2>
      </div>
      <div className={cx('description-container')}>
        <Image src="/images/description1.png" alt="description1" width={500} height={500} />
        <h2 className={cx('description-title')}>감정을 골라요</h2>
        <p className={cx('description-text')}>10가지 귀여운 캐릭터중 오늘의 감정을 하나 선택하세요.</p>
      </div>
      <div className={cx('description-container')}>
        <Image src="/images/description2.png" alt="description2" width={500} height={500} />
        <h2 className={cx('description-title')}>짧게 기록해요</h2>
        <p className={cx('description-text')}>부담 없이 한두 줄이면 충분해요 태그를 달아서 나중에 찾아볼 수도 있어요.</p>
      </div>
      <div className={cx('description-container')}>
        <Image src="/images/description3.png" alt="description3" width={500} height={500} />
        <h2 className={cx('description-title')}>나를 이해해요</h2>
        <p className={cx('description-text')}>캘린더와 통계로 감정 패턴을 한눈에 확인하세요.</p>
      </div>
      <div className={cx('main-description')}>
        <h2 className={cx('main-description-title')}>매일 밤 1분, 오늘의 감정을 돌아보는 시간이 저를 많이 바꿔놨어요.</h2>
        <p className={cx('main-description-subtext')}>- 3개월째 기록중인 사용자</p>
        <Image src="/images/description-icons.png" alt="description-icons" width={250} height={30} />
      </div>
      <div className={cx('main-start')}>
        <h2 className={cx('title')}>오늘부터 시작해볼까요?</h2>
        <p className={cx('subtitle')}>무료로 시작하고, 나를 이해하는 여정을 떠나요.</p>
        <button type="button" className={cx('start-button')}>
          무료로 시작하기
        </button>
      </div>
      <div className={cx('main-footer')}>
        <h2 className={cx('footer-title')}>Moodly</h2>
        <p className={cx('footer-subtitle')}>이용약관 · 개인정보처리방침 · 문의하기</p>
        <p className={cx('footer-text')}>© 2026 Moodly. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
