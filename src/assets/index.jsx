import '@babel/polyfill';
import * as $ from 'jquery';
import './model/lodash';

import Post from './model/post';
import json from './data';
import webpackLogo from './img/webpack-logo.png';
import xml from './data.xml';
import csv from './data.csv';

import './css/style.css';
import './less/style.less';
import './sass/style.sass';
import './sass/style.scss';

const post = new Post('Webpack Post Title!', webpackLogo);
$('pre').html(post.toString());

async function start() {
   return await new Promise((r) => setTimeout(() => r('Async done'), 2000));
}

start().then(res => console.log(res));

// class Util {
//    static id = Date.now();
// }

// console.log('Util ID:', Util.id);

// import React from 'react';
// import { render } from 'react-dom';

// const App = () => (
//    <>
//       <div class="container">
//       <h1>Webpack training</h1>
//    </div>
//    <div class="webpack-logo" />
//    <pre />
//    <div class="less-demo">
//       <h2>Less</h2>
//    </div>
//    <div class="scss-demo">
//       <h2>Scss</h2>
//    </div>
//    <div class="sass-demo">
//       <h2>Sass</h2>
//    </div>
//    </>
// )

// ReactDOM.render(<App />, document.querySelector('#root'));