import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

require('./app.css');

var App = React.createClass({
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

var Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  }
});

var Inbox = React.createClass({
  render: function () {
    return (
      <div>
        <p>Inbox</p>
      </div>
    );
  }
});

var Calendar = React.createClass({
  render: function () {
    return (
      <div>
        <p>Calendar</p>
      </div>
    );
  }
});

let history = createBrowserHistory();

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="app" component={Dashboard}/>
      <Route path="inbox" component={Inbox}/>
      <Route path="calendar" component={Calendar}/>
      <Route path="*" component={Dashboard}/>
    </Route>
  </Router>
), document.body);
