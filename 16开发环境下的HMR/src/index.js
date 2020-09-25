import './iconfont/iconfont.css';
import './css/index.less';
import './css/index.css';
import print from './js/print';
function add(x, y) {
    return x + y;
}
console.log(add(1, 2));


if (module.hot) {
    // 一旦module.hot 为true 说明开启了HMR功能 --> 让HMR功能代码生效
    module.hot.accept('./js/print.js', function () {
        // 方法会监听print.js 文件的变化,一旦发生变化，其他模块不会重新打包构建
        // 会执行后面的回调函数
        print();
    })
}