import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'es6-promise';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import smoothScroll from './modules/smoothScroll';
import slider from './modules/slider';
import switchPhotos from './modules/switchPhotos';
import calc from './modules/calc';
import formsHandler from './modules/formsHandler';

countTimer('30 july 2020 7:35');

toggleMenu();

togglePopUp();

tabs();

smoothScroll();

slider();

switchPhotos();

calc(100);

formsHandler();
