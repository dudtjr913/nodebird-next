import React from 'react';
// import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  /* const router = useRouter();
  const { id } = router.query; */
  const { singlePost } = useSelector((state) => state.post);
  return (
    <AppLayout>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    try {
      const cookie = context.req && context.req.headers.cookie;
      axios.defaults.headers.Cookie = '';
      if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params.id,
      });
      context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      context.store.dispatch(END);
      await context.store.sagaTask.toPromise();
    } catch (err) {
      console.error(err);
    }
  },
);

export default Post;
