import StartUtility from "./Utility/StartUtility";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonDisable extends cc.Component {
	start() {
		StartUtility.Start(() => {
			this.getComponent(cc.Button).enabled = true;
		});
	}
	public Disable() {
		this.getComponent(cc.Button).enabled = false;
	}
}
