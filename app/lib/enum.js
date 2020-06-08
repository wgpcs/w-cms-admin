/**
 * @description 登陆类型 枚举
 */

 const LoginType = {
     USER_MINI_PRO: 100,
     USER_EMAIL: 101,
     ADMIN_EMAIL: 200,
     isAllowType
 }

 function isAllowType(val){
     for (let key in this){
         if(this[key] == val){
             return true
         }
     }
     return false
 }

 module.exports = {
     LoginType
 }