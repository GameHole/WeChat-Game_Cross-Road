export default class ItemData {
    private static _pause: boolean = false;
    public static get isPause(): boolean { return this._pause; }
    public static Pause() {
        this._pause = true;
    }
    public static Restart() {
        this._pause = false;
    }
    private static _magent: boolean = false;
    public static get isMagent(): boolean { return this._magent; }
    public static SetMagent(start: boolean) {
        this._magent = start;
    }
    private static _isbig: boolean;
    public static get isBig(): boolean { return this._isbig; }
    public static SetBig(big: boolean) {
        this._isbig = big;
    }
    private static _isflying: boolean;
    public static get isFly(): boolean { return this._isflying; }
    public static SetFly(fly: boolean) {
        this._isflying = fly;
    }
    public static readonly MagentDiatance: number = 550;
    public static Clear() {
        this._pause = false;
        this._magent = false;
        this._isbig = false;
    }
    
}
