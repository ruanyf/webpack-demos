import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Router, Route, Link, IndexRoute, browserHistory, createMemoryHistory, RouterContext, match } from 'react-router';

let App = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="/app">Dashboard</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
          </ul>
          Logged in as Jane
        </header>
        {this.props.children}
      </div>
    );
  }
});

let Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  }
});

let Inbox = React.createClass({
  render: function () {
    return (
      <div>
        <p>Inbox</p>
      </div>
    );
  }
});

let Calendar = React.createClass({
  render: function () {
    return (
      <div>
        <p>Calendar</p>
      </div>
    );
  }
});

let routes = (<Route path="/" component={App}>
  <IndexRoute component={Dashboard}/>
  <Route path="app" component={Dashboard}/>
  <Route path="inbox" component={Inbox}/>
  <Route path="calendar" component={Calendar}/>
  <Route path="*" component={Dashboard}/>
</Route>);

if (typeof document !== 'undefined') {
  require('./app.css');
  render((
    <Router routes={routes} history={browserHistory}>
    </Router>
  ), document.querySelector('#app'));
}

export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(null, locals.template({
      html: renderToString(<RouterContext {...renderProps} />),
      bundlejs: locals.bundlejs
    }));
  });
};
