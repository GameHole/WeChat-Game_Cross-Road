import ActionTo from "./ActionTo";
import MathUtility from "../Utility/MathUtility";

const {ccclass, property} = cc._decorator;
@ccclass
export default class ColorTo extends ActionTo {
	update(dt) {
		//console.log("sc iRun::" + this.IsRun);
		super.update(dt);
	}
	protected Lerp(start: any, end: any, add: number) {
		//console.log("colorto::run");
        this.node.opacity = MathUtility.LerpNum(start, end, add);
    }
    protected End(end: any) {
        this.node.opacity = end;
    }
}
