import ItemData from "../TriggerDealers/ItemData";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import Number from "../Number";
import StartUtility from "../Utility/StartUtility";
import ValueTwinkler from "../ValueTwinkler";
import ImageEffect from "../ImageEffect";

const {ccclass, property} = cc._decorator;
@ccclass
export default class CountDown extends cc.Component {
    @property(Number)
    countDown: Number = null;
    
	private add: number = 0;
	private isStart: boolean = false;
    private Max: number = 0;
    start() {
        this.valueShake = this.addComponent(ValueTwinkler);
        this.valueShake.F = 0.25;
		this.countDown.node.active = false;
		EventUtility.Regist(EventNames.onPause, (e) => {
			this.add = 0;
			this.Max = e;
			this.isStart = true;
            this.countDown.node.active = true;
            //new
            this.ttime = 0;
            this.isFired = false;
            this.last = e;
		});
		EventUtility.Regist(EventNames.onPlayerDead, () => {
			this.isStart = false;
            this.countDown.node.active = false;
            //new
            this.valueShake.Stop();
		});
    }
	update(dt) {
        if (this.isStart == true) {
            this.add += dt;
            if (this.add >= 1) {
                this.add = 0;
                this.Max--;
            }
            this.countDown.SetNumber(this.Max);
            if (this.Max <= 0) {
                this.isStart = false;
                this.countDown.node.active = false;
            }

            this.ttime += dt;
            if (this.ttime >= this.last - this.valueShake.duration - 0.1 && !this.isFired) {
                this.valueShake.Run(() => {
                    ImageEffect.SetGray();
                }, () => {
                    ImageEffect.SetNormal();
                });
                this.isFired = true;
            }
        }
    }

    private valueShake: ValueTwinkler;
    private ttime: number = 0;
    private isFired = false;
    private last: number = 0;
}
