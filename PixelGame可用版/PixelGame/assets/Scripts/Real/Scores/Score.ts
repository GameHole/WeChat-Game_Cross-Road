import RealPlayer from "../RealPlayer";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import Combot from "./Combot";
import Number from "../Number";
import SaveUtility from "../Utility/SaveUtility";
import Wx from "../WXAPI/wx";
import StartUtility from "../Utility/StartUtility";
import CloudUtility from "../Utility/CloudUtility";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Score extends cc.Component {
    private combot: Combot;
    @property(Number)
    public text: Number = null;
    public value = 0;
    public maxValue: number;
	start() {
		let max = SaveUtility.GetItem("MaxScore");
		if (max == null)
			this.maxValue = 0;
		else
			this.maxValue = max;
        this.combot = cc.find("Combot").getComponent(Combot);
        EventUtility.Regist(EventNames.onPlayerDead, (s) => {
            this.text.node.active = false;
        })
		EventUtility.Regist(EventNames.onForward, (s) => {
			this.value += (s * 10 + this.combot.CombotScore);
			if (this.value > this.maxValue) {
				this.maxValue = this.value;
			}
		});
		StartUtility.Start(() => {
			this.text.node.active = true;
			this.value = 0;
		});
    }
    update(dt) {
        this.text.SetNumber(this.value);
    }
}
