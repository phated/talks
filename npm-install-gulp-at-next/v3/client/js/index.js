import { phoenix } from './phoenix.js';
import { javascript } from './javascript.js';
import hello from './hello.js';

var heading = document.getElementById('inject');

setTimeout(() => heading.innerHTML = hello(phoenix(), javascript()), 1000);
