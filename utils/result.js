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