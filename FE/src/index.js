import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import MyTheme from './theme';
import store from './store';
import NoMatch from './noMatch';
import CarLists from './carLists';

import './main.css';

const rootElement = document.querySelector('#root');

function App() {
  return (
    <MuiThemeProvider theme={MyTheme}>
      <Switch>
        <Route exact path="/" component={CarLists} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </MuiThemeProvider>
  );
}

if (rootElement) {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    rootElement,
  );
}
