import RealPlayer from "./RealPlayer";
//import OnCollideCar from "./OnCollideCar";
import EventUtility from "./Utility/EventUtility";
import EventNames from "./EventNames";
import ItemData from "./TriggerDealers/ItemData";
const { ccclass, property } = cc._decorator;

@ccclass
export default class InputHandler extends cc.Component {
	@property(RealPlayer)
	public player: RealPlayer = null;
    @property()
    deadLine: number = 50;
	private dir: cc.Vec2 = cc.Vec2.ZERO;
	//public canTouch = false;
    start() {
        //EventUtility.Regist(EventNames.onPlayerDead, () => { this.node.active = false; });
        this.node.on(cc.Node.EventType.TOUCH_START, (e: any) => {
            let end = e.getLocation();
            this.dir = new cc.Vec2(end.x, end.y);
            // console.log("start::" + this.dir);
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, (e: any) => {
            if (ItemData.isFly) {
                EventUtility.Fire(EventNames.onEmergencyStop);
                return;
            }
            let end = e.getLocation();
            let endP: cc.Vec2 = new cc.Vec2(end.x, end.y);
            // console.log("end::" + endP);
            this.dir = endP.sub(this.dir);
            //if (this.canTouch) {
            let direction = this.getMoveDir(this.dir);
            //console.log("input");
            this.player.move(direction);
            //}
            this.dir = cc.Vec2.ZERO;

        }, this.node);

    }
    public getMoveDir(dir: cc.Vec2): cc.Vec2 {
        let x = Math.sign(dir.x);
        let y = Math.sign(dir.y);

        // console.log(x, y);
        if (x == 0 || y == 0 || dir.magSqr() <= this.deadLine * this.deadLine)
            return cc.Vec2.RIGHT;

        if (x + y == 0) {
            return new cc.Vec2(0, -x);
        } else {
            return new cc.Vec2(x, 0);
        }
    }
}
