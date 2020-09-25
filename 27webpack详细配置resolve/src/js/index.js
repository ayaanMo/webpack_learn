import '../css/index.css';
// 上面等同于下面 在webpack配置中的alias里面配置的
import '$css/index.css';

function division(a, b) {
    return a / b;
}
console.log(division(6, 2));

