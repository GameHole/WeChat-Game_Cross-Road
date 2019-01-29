export default class Wx {
    private static _wx;
    public static SafeCall(func: (wx) => void) {
        this._init();
        if (this._wx != null)
            func(this._wx);
    }
    private static _init() {
        if (this._wx == null) {
            this._wx = window["wx"];
        }
    }
    public static Send(name: string, args) {
        Wx.SafeCall((wx) => {
            let x = wx.getOpenDataContext();
            if (x == null) return;
            x.postMessage({
                funcName: name,
                Args: JSON.stringify(args)
            });
        })
    }
    private static funcs = [];
    public static Listen() {
        Wx.SafeCall((wx) => {
            wx.onMessage(data => {
                let func = this.funcs[data.funcName];
                if (func != null) func(JSON.parse(data.Args));
            });
        });
    }
    public static Regist(name: string, func) {
        this.funcs[name] = func;
    }
    public static setUserCloudStorage(key: string, value: any, succ: Function, err: Function) {
        Wx.SafeCall((wx) => {
            wx.setUserCloudStorage({
                KVDataList: [{ key: key, value: JSON.stringify(value) }],
                success: function (res) { if (succ != null) succ(res); },
                fail: function (res) { if (err != null) err(res); }
            });
        });
    }
    public static getFriendCloudStorage(keylist: Array<string>, succ: Function, err: Function) {
        Wx.SafeCall((wx) => {
            wx.getFriendCloudStorage({
                keyList: keylist,
                success: function (res) { if (succ != null) succ(res); },
                fail: function (res) { if (err != null) err(res); }
            });
        });
    }
}
