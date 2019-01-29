import Transform from "../Transform/Transform";
import StartUtility from "./Utility/StartUtility";
import List from "../System/List";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Camera extends cc.Component {
	private static _main: Camera;
	public static get main(): Camera {
		return this._main;
	}
	private position: cc.Vec2 = cc.Vec2.ZERO;
	private canvax: cc.Canvas;
	private dir: cc.Vec2;
	public get Projection() {
		return this.dir;
	}
	private list = new List<Transform>();
	public Regist(tran: Transform) {
		this.list.Add(tran);
	}
	public Remove(tran: Transform) {
		this.list.Remove(tran);
	}
	onLoad() {
		Camera._main = this;
	}
	start() {
		this.canvax = this.getComponent(cc.Canvas);
		this.dir = new cc.Vec2(this.canvax.designResolution.width / 2, this.canvax.designResolution.height / 2);
	}
	public get Position() {
		return this.position.clone();
	}
	public set Position(value: cc.Vec2) {
        this.position = value.clone();
		for (let i = 0; i < this.list.Count; i++) {
			let item = this.list.Get(i);
			if (item.node.active && item.enabled) {
				item.toLocal();
			}
        }
	}
}
