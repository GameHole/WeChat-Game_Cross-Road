import MathUtility from "../Utility/MathUtility";
import ActionTo from "./ActionTo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScaleTo extends ActionTo {
    protected Lerp(start: number, end: number, add: number) {
        this.node.scale = MathUtility.LerpNum(start, end, add);
    }
    protected End(end) {
        this.node.scale = end;
    }
}
