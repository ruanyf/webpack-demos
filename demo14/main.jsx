import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>i betcha underscore is available here and its version is {_.VERSION}</h1>,
    document.querySelector('#app')
);
