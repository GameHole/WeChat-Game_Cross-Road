import ReferSelf from "../Real/ReferSelf";
import Random from "../Real/Random";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestEnter extends cc.Component {
	private rs: ReferSelf;
	private add: number = 0;
	private t: number;
	onLoad() {
		this.t = Random.Range(1, 2);
		this.rs = this.addComponent(ReferSelf);
	}
	update(dt) {
		this.add += dt;
		if (this.add >= this.t) {
			console.log("desSelf");
			this.rs.RemoveRef();
			this.node.active = false;
		}
	}
}
