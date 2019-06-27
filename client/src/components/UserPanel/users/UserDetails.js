import React, { Fragment } from 'react';
import TaskList from '../tasks/TaskList';
import PostList from '../posts/PostList';
import { Route } from 'react-router-dom';
import TaskCreate from '../tasks/TaskCreate';
import PostCreate from '../posts/PostCreate';
import Page from '../../layout/Page';
import './UserDetails.css'

const UserDetails = () => {
  return (
    <Fragment>
      <Page className="sub-page">
        <Route exact path="/users/:id" component={TaskList} />
        <Route exact path="/users/:id/tasks/new" component={TaskCreate} />
        <Route path="/users/:id" component={TaskList} />
      </Page>
      <Page className="sub-page">
        <Route exact path="/users/:id" component={PostList} />
        <Route exact path="/users/:id/posts/new" component={PostCreate} />
        <Route path="/users/:id" component={PostList} />
      </Page>
    </Fragment>
  );
};

export default UserDetails;
