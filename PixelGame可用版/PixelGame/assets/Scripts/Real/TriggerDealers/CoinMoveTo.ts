import MoveTo from "../MoveTo";
import Transform from "../../Transform/Transform";
import MathUtility from "../Utility/MathUtility";
import ItemData from "./ItemData";
import DealCoin from "./DealCoin";
import Trigger from "../Trigger";
import RealPlayer from "../RealPlayer";

const {ccclass, property} = cc._decorator;
@ccclass
export default class CoinMoveTo extends cc.Component {
	private once: boolean;
	private player: Transform;
	private isStart: boolean;
	@property()
	speed: number = 50;
    public Init() {
        this.player = RealPlayer.main.getComponent(Transform);//cc.find("Canvas/O/RealPlayer").getComponent(Transform);
        this.once = false;
        this.isStart = false;
    }
	update(dt) {
		let tran = this.getComponent(Transform);
        if (tran == null) return;
        if (this.player == null) return;
		if (ItemData.isMagent && MathUtility.Distance(tran.Position, this.player.Position) <= ItemData.MagentDiatance) {
			if (!this.once)
				this.isStart = this.once = true;
		}
		if (this.isStart) {
			let speed = this.speed;
			if (ItemData.isFly) speed *= 1.5;
			let dir = this.player.Position.sub(tran.Position).normalize();
			tran.Position = tran.Position.add(dir.mul(speed * dt));
			if (MathUtility.Distance(tran.Position, this.player.Position) <= speed * dt) {
				if (this.node.isValid)
					this.player.getComponent(DealCoin).onTriggerEnter(this.getComponent(Trigger), null);
			}
		}
	}
}
