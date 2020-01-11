 /* 防抖函数
  *  如果我们直接执行 refresh 函数，那么 refresh 函数会被执行30次
  *  可以将 refresh 函数传入 debounce 函数中，生成一个新的函数
  */

 export function debounce(func, delay) {
    let timer = null
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        // apply 调用函数
        func.apply(this, args)
      }, delay);
    };
  }
 