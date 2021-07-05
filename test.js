const { m, createElement, patch } = require('million');

const app = createElement(m('div', { id: 'app' }, ['Hello World']));

console.log(app);