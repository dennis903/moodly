import styles from './Detail.module.css';
import {EMOTION_VALUES} from '@/constants/emotion.constant';
import {formatAmPmToKorean, formatDateToKoreanDay} from '@/utils';
import classNames from 'classnames/bind';
import {ArrowLeft, ArrowRight, Ellipsis} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {type FC} from 'react';

const cx = classNames.bind(styles);

interface IDetailPresenterModuleProps {
  date: string | undefined;
  emotion: string | undefined;
  memo: string | undefined;
  tags:
    | {
        id: string;
        name: string;
        userId: string;
      }[]
    | undefined;
  updatedAt: string | undefined;
  onClickEdit: () => void;
}

const DetailPresenterModule: FC<IDetailPresenterModuleProps> = (props) => {
  return (
    <div className={cx('detail')}>
      <div className={cx('detail__header')}>
        <Link href="/calendar" className={cx('detail__header-button')}>
          <ArrowLeft size={24} />
        </Link>
        <button type="button" className={cx('detail__header-button')} onClick={props.onClickEdit}>
          <Ellipsis size={24} />
        </button>
      </div>
      <div className={cx('detail__content')}>
        <div className={cx('detail__content-header')}>
          <Image src={`/images/${props.emotion?.toLowerCase()}.png`} alt="emotion-calm" width={130} height={130} />
          <h2 className={cx('detail__content-header-date')}>{props.date}</h2>
          <p className={cx('detail__content-header-day')}>{formatDateToKoreanDay(props.date)}</p>
          <div className={cx('detail__content-header-emotion')}>{EMOTION_VALUES.find((emotion) => emotion.value === props.emotion)?.label}</div>
        </div>
        <div className={cx('detail__content-body')}>
          <p className={cx('detail__content-body-text')}>{props.memo}</p>
          <div className={cx('detail__content-tags')}>
            {props.tags?.map((tag) => (
              <div key={tag.id} className={cx('detail__content-tag')}>
                #{tag.name}
              </div>
            ))}
          </div>
          {props?.updatedAt && <div className={cx('detail__content-time')}>작성 {formatAmPmToKorean(new Date(props.updatedAt))}</div>}
        </div>
        <div className={cx('detail__content-footer')}>
          <button type="button" className={cx('detail__content-footer-button')}>
            <ArrowLeft size={12} />
            <span className={cx('detail__content-footer-text')}>이전 일기</span>
          </button>
          <button type="button" className={cx('detail__content-footer-button')}>
            <span className={cx('detail__content-footer-text')}>다음 일기</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPresenterModule;
