import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';
import './index.scss';

class MyFavMovieApplication extends React.Component {
  render() {
    return <MainView />;
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFavMovieApplication), container);