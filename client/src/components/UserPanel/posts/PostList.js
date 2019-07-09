import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../../actions/';
import PostData from './PostData';
import PropTypes from 'prop-types';
import SubPageHeader from '../../layout/SubPageHeader';
import Spinner from '../../layout/Spinner';

const PostList = ({
  posts,
  fetchPosts,
  match: {
    params: { id }
  },
  loading
}) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts ]);
 
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <SubPageHeader
        title={`Posts - User ${id}`}
        link={`/users/${id}/posts/new`}
      />
      <ul className="list">
        {posts &&
          posts.length > 0 &&
          posts
            .filter(post => post.userId === parseInt(id))
            .map(post => <PostData key={post.id} post={post} />)}
      </ul>
    </Fragment>
  );

}

const mapStateToProps = state => ({
  posts: Object.values(state.posts.postList),
  loading: state.posts.loading
});

PostList.prototype = {
  posts: PropTypes.array.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostList);
