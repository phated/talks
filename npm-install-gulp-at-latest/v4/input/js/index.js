import { city } from './city.js';
import { meetup } from './meetup.js';
import hello from './hello.js';

var heading = document.getElementById('inject');

setTimeout(() => heading.innerHTML = hello(city(), meetup()), 1000);
