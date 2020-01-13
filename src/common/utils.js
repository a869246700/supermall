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


 export function formatDate(date, fmt) {
   //  获取年份
   /* 
      y+ -> 1个或者多个y
      y* -> 0个或者多个y
      y? -> 0个或者1个y
   */
   if (/(y+)/.test(fmt)) {
     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
   }
   //  获取具体时间
   let o = {
     'M+': date.getMonth() + 1,
     'd+': date.getDate(),
     'h+': date.getHours(),
     'm+': date.getMinutes(),
     's+': date.getSeconds()
   };
   for (let k in o) {
     if (new RegExp(`(${k})`).test(fmt)) {
       let str = o[k] + '';
       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
     }
   }
   return fmt;
 };

 function padLeftZero(str) {
   return ('00' + str).substr(str.length);
 };
