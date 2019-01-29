import ItemData from "../TriggerDealers/ItemData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Trafficlight extends cc.Component {
	private lights = new Array<cc.Node>();
	private times = new Array<number>();
	private state: number = 0;
	private add: number = 0;
	public onStateChange: (state: number) => void;
	start() {
		this.lights[0] = this.node.getChildByName("r");
		this.lights[1] = this.node.getChildByName("y");
		this.lights[2] = this.node.getChildByName("g");
		this.lights[3] = this.lights[1];
		this.times[0] = 3;
		this.times[1] = 1;
		this.times[2] = 2;
		this.times[3] = 1;
		let state = this.state;
		if (state == 3) state = 1;
		if (this.onStateChange != null) this.onStateChange(state);
	}
	private showLight() {
		for (var i = 0; i < this.lights.length; i++) {
			this.lights[i].active = false;
		}
		this.lights[this.state].active = true;
	}
	update(dt) {
		if (!ItemData.isPause) {
			this.add += dt;
			this.showLight();
			if (this.add >= this.times[this.state]) {
				if (++this.state >= this.times.length) {
					this.state = 0;
				}
				let state = this.state;
				if (state == 3) state = 1;
				if (this.onStateChange != null) this.onStateChange(state);
				this.add = 0;
			}
		}
	}
}
