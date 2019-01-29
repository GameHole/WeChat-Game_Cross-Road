import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
import Walkable from "../../../Walkable";
import UIGround from "../../UIGround";
export default class RemoveObs extends Action {
    public Execute(input: Array<ResouseData>, output: UIMap): boolean {
        let uig = output.GetALine(output.length - 1);
        for (let i = output.sideSizeDown; i < output.sideSizeDown + output.width; i++) {
            //let walk = uig.Get(i).getComponent(Walkable);
            //if (!walk.walkAble) {
            //    uig.GetOb(i).destroy();
            //    walk.walkAble = true;
            //    //console.log("removed::"+uig.wayType);
            //}
            RemoveObs.Remove(uig, i);
        }
        return true;
    }
    public static Remove(uig: UIGround, i: number) {
        let walk = uig.Get(i).getComponent(Walkable);
        if (!walk.walkAble) {
            uig.DestroyAnOb(i);
            walk.walkAble = true;
        }
    }
}
