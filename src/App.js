import React from 'react';
import { Provider } from 'react-redux';
import { RawIntlProvider } from 'react-intl';
import Main from './pages/Main';
import Store from './store';
import { getIntl } from './utility/translations';

import { makeServer } from './mock';
if (process.env.REACT_APP_USE_MOCK) {
  makeServer();
}

function App() {
  return (
    <Provider store={Store}>
      <RawIntlProvider value={getIntl()}>
        <div className="App">
          <Main />
        </div>
      </RawIntlProvider>
    </Provider>
  );
}

export default App;
