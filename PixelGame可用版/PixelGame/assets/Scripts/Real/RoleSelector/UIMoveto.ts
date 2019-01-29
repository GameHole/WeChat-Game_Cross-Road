import MathUtility from "../Utility/MathUtility";
import ActionTo from "./ActionTo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMoveto extends ActionTo {
    protected Lerp(start, end, add: number) {
		this.node.position = MathUtility.Lerp(start, end, add);
    }
    protected End(end) {
        this.node.position = end;
    }
}
