import EventUtility from "./Utility/EventUtility";
import EventNames from "./EventNames";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Toucher extends cc.Component {
    private startP: cc.Vec2 = cc.Vec2.ZERO;
    @property()
    deadLine = 200;
	start() {
		this.node.on(cc.Node.EventType.TOUCH_START, (e: any) => {
			let end = e.getLocation();
			this.startP = new cc.Vec2(end.x, end.y);
		});
		this.node.on(cc.Node.EventType.TOUCH_MOVE, (e: any) => {
			let end = e.getLocation();
			let endP: cc.Vec2 = new cc.Vec2(end.x, end.y);
			let diff = endP.sub(this.startP);
            if (diff.mag() > 200) {
                EventUtility.Fire(EventNames.onToucherMove, diff, this);
				this.startP = endP;
			}
		});
	}
}
