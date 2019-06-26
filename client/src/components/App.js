import React from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors/';
import UserDelete from './UserPanel/users/UserDelete';
import UserPanel from './UserPanel/UserPanel';

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Route path="/users/:id/delete" component={UserDelete} />
        <Route path="/" component={UserPanel} />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
