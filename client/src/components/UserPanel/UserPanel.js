import React from 'react';
import UserList from './users/UserList';
import UserDetails from './users/UserDetails';
import particlesParams from '../../particlesParams';
import Particles from 'react-particles-js';
import UserCreate from './users/UserCreate';
import { Route } from 'react-router-dom';
import Page from '../../hoc/Page';
import './UserPanel.css';
import { Button } from '@material-ui/core';

const UserPanel = () => {
  return (
    <div className="full-screen">
      <Particles
        className="particles"
        width={'100vw'}
        height={'100vh'}
        params={particlesParams}
      />

      <div className="responsive-bar">
        <a href="#1">
          <Button variant="contained" color="primary">
            <i className="material-icons">keyboard_arrow_up</i>
          </Button>
        </a>
        <a href="#2">
          <Button variant="contained" color="primary">
            <i className="material-icons">keyboard_arrow_down</i>
          </Button>
        </a>
      </div>

      <Page id="1" className="page">
        <Route path="/users/:id" component={UserList} />
        <Route path="/" component={UserList} />
      </Page>

      <Page id="2" className="page">
        <Route exact path="/users/new" component={UserCreate} />
        <Route path="/users/:id" component={UserDetails} />
      </Page>
    </div>
  );
};

export default UserPanel;
