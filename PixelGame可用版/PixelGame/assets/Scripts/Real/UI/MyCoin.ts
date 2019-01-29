import Number from "../Number";
import SaveUtility from "../Utility/SaveUtility";
import CloudUtility from "../Utility/CloudUtility";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MyCoin extends cc.Component {
    private static value: number = 0;
    public static get Value() {
        return MyCoin.value;
    }
    private static func;
	private num: Number;
	private shadow: Number;
	start() {
		this.num = this.node.getChildByName("coinNum").getComponent(Number);
		this.shadow = this.node.getChildByName("shadow").getComponent(Number);
		let x = SaveUtility.GetItem("coin");
		if (x == null)
			MyCoin.value = 0;
		else
			MyCoin.value = x;
		this.SetNum()
		MyCoin.func = () => {
			this.SetNum();
		}
	}
	private SetNum() {
		this.num.SetNumber(MyCoin.value);
		this.shadow.SetNumber(MyCoin.value);
	}
    public static Sub(value: number) {
        this.value -= value;
        if (this.value < 0)
            this.value = 0;
		SaveUtility.SetItem("coin", this.value);
		CloudUtility.UpdateServer("coin");
		//CloudUtility.setData("coin", this.value, null);
        this.func();
    }
    public static Add(value: number) {
		this.value += value;
		this.func();
        //console.log("value::" + this.value + "  Add::" + value);
		SaveUtility.SetItem("coin", this.value);
		CloudUtility.UpdateServer("coin");
		//CloudUtility.setData("coin", this.value, null);
    }
}
