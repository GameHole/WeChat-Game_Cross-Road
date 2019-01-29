import ADealer from "./ADealer";
import Trigger from "../Trigger";
import WaitShow from "../RoleSelector/WaitShow";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import PoolUtility from "../Utility/PoolUtility";
import ReferSelf from "../ReferSelf";
import StartUtility from "../Utility/StartUtility";

const {ccclass, property} = cc._decorator;
@ccclass
export default abstract class DealItem extends ADealer {
    @property()
	lastTime: number = 5;
	protected wait: WaitShow = null;
	private orgTime: number=5;
    start() {
		this.wait = this.addComponent(WaitShow);
		this.orgTime = this.lastTime;
		StartUtility.OnClear(() => {
			this.lastTime = this.orgTime;
			//console.log("last::"+this.lastTime);
			//this.wait.Stop();
			//this.onRunOver();
		});
	}
	public static Retuen(other: Trigger) {
		//other.getComponent(ReferSelf).RemoveRef();
		//PoolUtility.Destroy(other.node);
		other.node.destroy();
	}
	public onTriggerEnter(other: Trigger, self: cc.Collider): void {
		DealItem.Retuen(other);
		
        this.onRunStart();
        this.wait.Run(this.lastTime, () => {
            this.onRunOver();
        });
    }
    protected abstract onRunOver(): void;
    protected abstract onRunStart(): void;
}
