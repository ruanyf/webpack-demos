import small from './small.png';
import big from './big.png';

const image1 = document.createElement('img');
image1.src = small;

const image2 = document.createElement('img');
image2.src = big;

[image1, image2].forEach(image => document.body.appendChild(image));
