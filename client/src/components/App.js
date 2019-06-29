import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors/';
import UserPanel from './UserPanel/UserPanel';
import ErrorPage from './ErrorPage';

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route path="/error" component={ErrorPage} />
          <Route path="/" component={UserPanel} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
