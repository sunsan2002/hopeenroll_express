/*
 * @Author: sunsan 2390864551@qq.com
 * @Date: 2023-11-27 22:12:51
 * @LastEditors: sunsan 2390864551@qq.com
 * @LastEditTime: 2024-03-07 22:14:45
 * @FilePath: \express-demo\utils\result.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class Result {
    constructor(code,msg,data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
    static success(data,msg) {
        return new Result(200, msg||"请求成功", data);
    }
    static error(msg) {
        msg = msg || "请求失败";
        return new Result(500, msg, null);
    }
}

module.exports = Result;