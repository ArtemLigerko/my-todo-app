import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './store';
 
const Global = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`

const root = ReactDOM.createRoot(document.getElementById('root') as any);
root.render(
  // <React.StrictMode>
  <>
    <Provider store={store}> {/* для связи react-компонента с redux */}
      <Global />
      <App />
    </Provider>
  </>
  // </React.StrictMode>
);

 