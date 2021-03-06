import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from '../store/guideStore';

import routes from '../routes/routes';

// import GuideContainer from '../containers/GuideContainer';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// const GuideApp = (props) => (
//   <Provider store={configureStore(props)}>
//     <GuideContainer />
//   </Provider>
const GuideApp = (props) => (
  <Provider store={configureStore(props)}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
);

export default GuideApp;
