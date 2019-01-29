import Transform from "../Transform/Transform";
import MathUtility from "./Utility/MathUtility";
import GameCoordinate from "./GameCoordinate";
import RealPlayer from "./RealPlayer";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class MoveTo extends cc.Component {
    private _org: cc.Vec2;
    public get Org(): cc.Vec2 {
        return this._org.clone();
    }
    private psatrt: cc.Vec2;
    private pend: cc.Vec2;
    private onOver: Function;
    private onframe: Function;
	private _isRun;
	public get isRun() { return this._isRun; }
    private transform: Transform;
    private add: number;
    @property()
	public speed: number = 20;
	private dir: cc.Vec2 = null;
	//private temp: cc.Vec2 = new cc.Vec2(0, 0);
    start() {
        this.transform = this.getComponent(Transform);
    }
    public Run(start: cc.Vec2, end: cc.Vec2, onframe: Function, over: Function) {
        //if (this.isRun) return;
        this.pend = end;
        this._org = start;
		this.psatrt = GameCoordinate.ToUIPosition(start);
		this.dir = this.pend.sub(this.psatrt);
        this.onOver = over;
        this.onframe = onframe;
        this.add = 0;
        this._isRun = true;
    }
    public Stop() {
        this._isRun = false;
    }
    update(dt) {
        if (this._isRun) {
			this.add += this.speed * dt;
			this.transform.Position.x = this.psatrt.x + this.dir.x * this.add;
			this.transform.Position.y = this.psatrt.y + this.dir.y * this.add;
			//MathUtility.Lerp(this.psatrt, this.pend, this.add);
            if (this.onframe) this.onframe(dt);
            if (this.add >= 1) {
                this.transform.Position = this.pend;
                if (this.onOver != null) this.onOver();
                this._isRun = false;
            }
        }
    }
}
