// 正常加载
// import {mul} from './js/test';
console.log("index js 已经加载")
function sum(...args) {
    return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));

document.getElementById('btn').onclick = function () {
    /* 
        懒加载：当文件需要使用时才加载
        预加载 prefetch：会在使用之前，提前加载js文件 等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
        正常加载：可以认为是并行加载（同一时间加载多个文件）
    */
    import(/* webpackChunkName:'test' */'./js/test').then(({ mul }) => {
        console.log(mul(4, 5));
    })
}
// 预加载  有很大的兼容性问题
//      import(/* webpackChunkName:'test' */,webpackPrefetch:true'./js/test').then(({ mul }) => {
//         console.log(mul(4, 5));
//     })
// } 