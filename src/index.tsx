/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';
import "./index.css";

import { Route, Router, useNavigate } from '@solidjs/router';
import { Identify } from './pages/Identify';
import { Thankyou } from './pages/Thankyou';
import { Pick } from './pages/Pick';
import { createEffect, ParentComponent } from 'solid-js';
import { center } from '@style/patterns';
import { identity } from './lib/store/identity';
import { Admin } from './pages/Admin';
import { css } from '@style/css';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const Root: ParentComponent = (props) => {
  return (
    <>
      <a href="/" class={css({ color: "fg.muted", position: "absolute", left: "1em", top: "1em" })}>Home</a>
      <div class={center({ padding: "5", width: "100%", height: "100vh" })}>
        {props.children}
      </div>
    </>
  );
}

const GuardUnidentified: ParentComponent = (props) => {
  const navigate = useNavigate();

  createEffect(() => {
    if (identity.group == "" && identity.name == "") {
      navigate("/");
    }
  });

  return (
    <>
      {props.children}
    </>
  );
}

render(() => <Router root={Root}>
  <Route path="/" component={Identify} />
  <Route component={GuardUnidentified}>
    <Route path="/thankyou" component={Thankyou} />
    <Route path="/pick" component={Pick} />
  </Route>
  <Route path="/admin" component={Admin} />
</Router >, root!);
