export default class EventUtility {
    private static _events = [[]];
    public static Regist(name: string, func: Function) {
        if (this._events[name] == null)
            this._events[name] = []
        this._events[name].push(func);
    }
    public static Remove(name: string, func: Function) {
        let e = this._events[name];
        if (e) {
            for (let i = 0; i < e.length; i++) {
                if (e[i] == func) {
                    e[i] = null;
                    //console.log("remove");
                }
            }
        }
    }
    public static TakeEvents(name: string) {
        return this._events[name];
    }
    public static Fire(name: string, args = null, sender = null) {
        let es = this.TakeEvents(name);
        if (es != null) {
            for (let i = 0; i < es.length; i++) {
                if (es[i] != null) {
                    es[i](args, sender);
                }
            }
        }
    }
    public static Clear() {
        this._events = [[]];
    }
}
