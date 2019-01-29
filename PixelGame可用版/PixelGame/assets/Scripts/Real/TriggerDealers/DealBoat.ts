import ADealer from "./ADealer";
import Tags from "./Tags";
import Trigger from "../Trigger";
import DealSwing from "./DealSwing";
import DealWater from "./DealWater";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DealBoat extends ADealer {
	public get Tag() { return Tags.Boat; }
	public onTriggerEnter(other: Trigger, self: cc.Collider): void {
		this.player.getComponent(DealSwing).Stop();
		this.player.getComponent(DealWater).onTriggerEnter(other, self);
	}
}
