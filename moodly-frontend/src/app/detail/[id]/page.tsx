import DetailContainer from '@/containers/Detail/Detail.container';
import {type FC} from 'react';

interface IDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const DetailPage: FC<IDetailPageProps> = async ({params}) => {
  const {id} = await params;

  return (
    <div>
      <DetailContainer id={id} />
    </div>
  );
};

export default DetailPage;
