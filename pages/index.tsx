import React from 'react';
import axios from 'axios';

import VideoCard from '../components/VideoCard/VideoCard';
import { BASE_URL } from '../utils';
import { Video } from '../types';
import NoResults from '../components/NoResult/NoResults';
import Meta from '../components/Meta/Meta';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <>
    <Meta title='Tiktok - Home' />
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length 
        ? videos?.map((video: Video) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        )) 
        : <NoResults text={`No Videos`} />}
    </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  
  return {
    props: { videos: response.data },
  };
};
