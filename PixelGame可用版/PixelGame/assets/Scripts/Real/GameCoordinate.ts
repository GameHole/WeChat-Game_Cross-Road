const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCoordinate extends cc.Component {
    private static _size: cc.Vec2;
    @property(cc.Vec2)
    public size: cc.Vec2 = new cc.Vec2(400, 200);
	public static scale: number = 1;
    @property()
    scale: number = 1;
    onLoad() {
        if (GameCoordinate._size == null) {
            GameCoordinate.scale = this.scale;
            GameCoordinate._size = this.size.mul(this.scale);
            let d = this.size.x / this.size.y;
            GameCoordinate.toLocal = new cc.Vec2(Math.sqrt(1 / (d * d) + 1.0) / 2.0, Math.sqrt(d * d + 1.0) / 2.0);
            GameCoordinate.toWorld = this.size.normalize();
            GameCoordinate._sknw = Math.atan(this.size.y / this.size.x) / Math.PI * 180.0;
            // console.log(GameCoordinate.InverseTransformDir(new cc.Vec2(0,1)));
        }
    }
    public static ToUIPosition(pos: cc.Vec2): cc.Vec2 {
        return new cc.Vec2((pos.x - pos.y) * this._size.x / 2.0, (pos.x + pos.y) * this._size.y / 2.0);
    }
    public static toRealPos(pos: cc.Vec2): cc.Vec2{
        return new cc.Vec2(Math.floor(pos.x / this._size.x + pos.y / this._size.y), Math.floor(pos.y / this._size.y - pos.x / this._size.x));
    }
    public static get Size(): cc.Vec2 {
        return this._size;
    }
    public static TakeScale(size: cc.Size): cc.Vec2 {
        return new cc.Vec2(this._size.x / size.width, this._size.y / size.height);
    }
    private static toLocal: cc.Vec2;
    private static _sknw: number;
    private static toWorld: cc.Vec2;
    public static TransformDir(dir: cc.Vec2): cc.Vec2 {
        return new cc.Vec2(dir.x * this.toLocal.x + dir.y * this.toLocal.y, -dir.x * this.toLocal.x + dir.y * this.toLocal.y);
    }
    public static InverseTransformDir(dir: cc.Vec2): cc.Vec2 {
        return new cc.Vec2(dir.x * this.toWorld.x - dir.y * this.toWorld.x, dir.x * this.toWorld.y + dir.y * this.toWorld.y);
    }
    public static get Sknw() {
        return this._sknw;
    }
}
