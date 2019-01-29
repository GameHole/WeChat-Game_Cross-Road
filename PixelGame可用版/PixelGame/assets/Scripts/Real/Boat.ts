import Car from "./Car";
import Tags from "./TriggerDealers/Tags";
import ItemData from "./TriggerDealers/ItemData";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Boat extends Car {
	protected AddTrigger() {
		super.AddTrigger();
		this.SerTag(Tags.Boat);
    }
    protected addShadow() {/*È¥µôÓ°×Ó*/ }
    protected update(dt) {
        if (!ItemData.isPause) {
            this.run(dt);
            //console.log("run");
        }
    }
}
