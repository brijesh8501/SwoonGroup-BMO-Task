import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(
      applyMiddleware(thunk)
  )
)

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes/>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
