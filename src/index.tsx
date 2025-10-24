/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';

import { Route, Router } from '@solidjs/router';
import { Identify } from './pages/Identify';
import { Thankyou } from './pages/Thankyou';
import { Pick } from './pages/Pick';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <Router>
  <Route path="/" component={Identify} />
  <Route path="/thankyou" component={Thankyou} />
  <Route path="/pick" component={Pick} />
</Router>, root!);
