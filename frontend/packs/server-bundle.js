import ReactOnRails from 'react-on-rails';

import App from '../src/components/App';
import HelloWorld from '../src/components/HelloWorld';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App
});
