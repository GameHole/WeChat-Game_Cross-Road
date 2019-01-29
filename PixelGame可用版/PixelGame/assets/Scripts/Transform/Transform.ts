import Camera from "../Real/Camera";
import GameCoordinate from "../Real/GameCoordinate";
import PoolUtility from "../Real/Utility/PoolUtility";
import RealPlayer from "../Real/RealPlayer";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Transform extends cc.Component {
	private position: cc.Vec2 = cc.Vec2.ZERO;
	public static toWorld(node: cc.Node): cc.Vec2 {
		if (node.name == "Canvas") return cc.Vec2.ZERO;
		let parent = node.parent;
		let wpos = node.position;
		while (parent.name != "Canvas") {
			//console.log(parent.name)
			wpos.x += parent.x;
			wpos.y += parent.y;
            parent = parent.parent;
        }
        return wpos;
	}
	start() {
		//console.log(Transform.toWorld(this.node));
		//console.log(Transform.toLocal(this.node.parent, new cc.Vec2(0, 0)));

		//console.log(this.Position = new cc.Vec2(0, 0));
		//console.log(this.node.position);

		//console.log(this.Position = new cc.Vec2(0, 50));
		//console.log(this.node.position);
		Camera.main.Regist(this);
	}
	public static toLocal(node: cc.Node, world: cc.Vec2): cc.Vec2 {
		//let org: cc.Vec2 = cc.Vec2.ZERO;
		//org = ;
		//let local = world.sub(org);
		
		let local = world.sub(Transform.toWorld(node));
		//console.log("local::" + local);
		return local;
	}
    public get Position(): cc.Vec2 {
		return this.position;
         //return this.toWorld(this.node.position);
    }
    public set Position(value: cc.Vec2) {
		this.position = value;
		this.toLocal();
	}
	//update() {
	//	this.toLocal();
	//}
	//lateUpdate() {
	//	this.toLocal();
	//}
	public toLocal() {
		this.node.position = Transform.toLocal(this.node.parent, this.position.sub(Camera.main.Position));
	}
	public Dispose() {
		Camera.main.Remove(this);
	}
	onDestroy() {
		this.Dispose();
	}
}
