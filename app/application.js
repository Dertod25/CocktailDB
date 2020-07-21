import React from 'react';
import {Provider} from 'react-redux';
import createStore from './redux/create';
import Root from './containers/root.container';

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
