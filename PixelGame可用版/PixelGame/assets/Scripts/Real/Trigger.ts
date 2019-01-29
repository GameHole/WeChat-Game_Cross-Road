import GameCoordinate from "./GameCoordinate";
import PoolUtility from "./Utility/PoolUtility";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Trigger extends cc.Component {
	private box: cc.BoxCollider;
	public tag: string;
	public Init(tag: string = "") {
		let chil = /*PoolUtility.New(tag);// */new cc.Node();
		this.tag = tag;

		this.box = /*PoolUtility.getorAddComponent(cc.BoxCollider, chil);//*/ chil.addComponent(cc.BoxCollider);
		//let size = this.node.getContentSize(false);
		//this.box.size = new cc.Size(size.width / 2, size.height / 2);
		chil.skewX = GameCoordinate.Sknw - 90;
		chil.skewY = GameCoordinate.Sknw;
		chil.parent = this.node;
		chil.position = cc.Vec2.ZERO;
	}
	public SetScale(scale: number) {
		this.box.node.scale = scale;
	}
	public SetSize(scale: cc.Vec2) {
		this.box.size = new cc.Size(scale.x, scale.y);
	}
	public set position(value: cc.Vec2) {
		this.box.node.position = value;
	}
	public SetTag(tag: string) {
		this.tag = tag;
	}
	public Enabled(enable: boolean) {
		this.box.node.active = enable;
	}
	//public onDestroyd(self) {
	//	//if (this)
	//	//if (this.box)
	//	//if (this.box.node) {
	//	//    // this.box.node.destroy();
	//	//    console.log("recysle trigger:: onDestroyd " + this.box.node.name);
	//	//    PoolUtility.Destroy(this.box.node);
	//	//        }
	//	//console.log("recysle trigger:: onDestroyd " + self.node.name);
	//	//if (this)
	//	//console.log(this);
	//	if (self.box != null) {
	//		//console.log("trigger::  onDestroyd " + self.node.name);
	//		PoolUtility.Destroy(self.box.node);
	//		self.box = null;
	//		//    self.box = null;
	//	}
	//	//self.destroy();
	//}
	//Destroy() {
	//	//if (!this.isValid) return;
	//	//console.log("onDestroy " + this.node.name);
	//	//if (this.box.node) {
	//	// this.box.node.destroy();
	//	console.log("trigger::  ondestroy " + this.node.name);
	//	if (this.box != null)
	//	PoolUtility.Destroy(this.box.node);
	//	this.destroy();
	//	//this.box = null;
	//	//this.destroy()
	//	//    this.box = null;
	//	//}
	//	//}
    //}
    public Destroy() {
        this.Enabled(false);
        this.destroy();
    }
	onDestroy() {
		if (this.box.node != null)
			this.box.node.destroy();
	}
}
