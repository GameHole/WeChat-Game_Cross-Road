import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
import UIGround from "../../UIGround";
export default class Mirror extends Action {
    public Execute(input: Array<ResouseData>, output: UIMap): boolean {
        let x = output.GetALine(output.length - 1);
        Mirror.mirror(x);
        return true;
    }
    public static mirror(x: UIGround) {
        for (let i = 0; i < x.length; i++) {
            let m = x.Get(i);
            m.node.scaleX = -m.node.scaleX;
            m.node.scaleY = -m.node.scaleY;
        }
    }
}
