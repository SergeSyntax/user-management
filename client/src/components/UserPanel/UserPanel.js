import React from 'react';
// import PropTypes from 'prop-types';
import UserList from './users/UserList';
import UserDetails from './users/UserDetails';
import particlesParams from '../../particlesParams';
import Particles from 'react-particles-js';
import UserCreate from './users/UserCreate';
import { Route } from 'react-router-dom';
import Page from '../../hoc/Page';
import './UserPanel.css';

const UserPanel = () => {
  return (
    <div className="full-screen">
      <Particles
        className="particles"
        width={'100vw'}
        height={'100vh'}
        params={particlesParams}
      />

      <Page className="page">
        <Route path="/users/:id" component={UserList} />
        <Route path="/" component={UserList} />
      </Page>

      <Page className="page">
        <Route exact path="/users/new" component={UserCreate} />
        <Route path="/users/:id" component={UserDetails} />
      </Page>
    </div>
  );
};

export default UserPanel;
