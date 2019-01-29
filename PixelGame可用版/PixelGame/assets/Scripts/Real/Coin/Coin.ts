import Number from "../Number";
import StartUtility from "../Utility/StartUtility";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Coin extends cc.Component {
    public value = 0;
    @property(Number)
	public text: Number = null;
	start() {
		StartUtility.Start(() => {
			this.value = 0;
		});
	}
    update(dt) {
        this.text.SetNumber(this.value);
    }
}
