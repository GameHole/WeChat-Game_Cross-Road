import Camera from "../Camera";
import Random from "../Random";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import ItemData from "../TriggerDealers/ItemData";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Shake extends cc.Component {
    private isStart: boolean;
    private camera: Camera;
    private run: number = 0;
    @property()
    runCount: number = 3;
	private count: number = 0;
	private A: number = 15;
    start() {
        this.camera = this.getComponent(Camera);
		EventUtility.Regist(EventNames.onJumpOver, (isrun) => {
			if (isrun) {
				this.isStart = ItemData.isBig;
			} else {
				this.run = 0;
				this.isStart = false;
			}
			this.count = 0;
		});
        //this.isStart = true;
    }
    private reset() {
        this.isStart = false;
        this.count = 0;
	}
	update() {
        if (this.isStart) {
            if (this.count >= this.runCount) {
                this.reset();
                return;
            }
            if (this.run < 360)
                this.run += 60;
            else {
                this.run = 0;
                this.count++;
			}
			this.camera.Position = this.camera.Position.add(cc.Vec2.UP.mul(this.A * Math.sin(this.run * Math.PI / 180)));
        }
    }
}
