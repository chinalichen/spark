import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
// import 'intl';
// import 'intl/locale-data/jsonp/en-US';
// import 'intl/locale-data/jsonp/zh-Hans-CN';
import enMessages from './i18n/en-US';
import zhMessages from './i18n/zh-CN';
import App from './App';
import { unregister } from './registerServiceWorker';
import './index.css';

addLocaleData([...en, ...zh]);

let locale = 'en';
let messages = enMessages;
if ((navigator.languages || []).find(language => language = 'zh')) {
  locale = 'zh';
  messages = zhMessages;
}

ReactDOM.render(
  <IntlProvider locale={locale} messages={messages} >
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
unregister();
