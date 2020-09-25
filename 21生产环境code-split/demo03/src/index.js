import $ from 'jquery';
// import { mul } from './js/test'
function sum(...args) {
    return args.reduce((p, c) => p + c, 0);
}
import(/* webpackChunkName:'test' */'./js/test').then(({ mul }) => {
    // eslint-disable-next-line
    console.log(mul(3, 2));
}).catch(() => {
    // eslint-disable-next-line
    console.log("文件加载失败")
})
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));
// eslint-disable-next-line
// console.log(mul(2, 3));
// eslint-disable-next-line
console.log($);