import React from 'react';
import UserList from './users/UserList';
import UserDetails from './users/UserDetails';
import UserCreate from './users/UserCreate';
import { Route } from 'react-router-dom';
import Page from '../layout/Page';
import './UserPanel.css';
import ResponsiveNavBar from '../layout/ResponsiveNavBar';
import Background from '../layout/Background';

const UserPanel = () => {
  return (
    <Background className="full-screen">
      <ResponsiveNavBar />
      <Page id="1" className="page">
        <Route path="/users/:id" component={UserList} />
        <Route path="/" component={UserList} />
      </Page>

      <Page id="2" className="page">
        <Route exact path="/users/new" component={UserCreate} />
        <Route path="/users/:id" component={UserDetails} />
      </Page>
    </Background>
  );
};

export default UserPanel;
