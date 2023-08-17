import ReactOnRails from 'react-on-rails';

import Root from '../src/MeetingMinutes';
import { store } from '../src/store/';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Root
});

ReactOnRails.registerStore({
  store
})