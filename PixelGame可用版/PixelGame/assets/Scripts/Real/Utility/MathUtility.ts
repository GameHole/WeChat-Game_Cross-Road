import Random from "../Random";
import List from "../../System/List";

export default class MathUtility {
    public static Distance(v0: cc.Vec2, v1: cc.Vec2): number {
        return v0.sub(v1).mag();
    }
    public static Lerp(from: cc.Vec2, to: cc.Vec2, r: number): cc.Vec2 {
        let diff = to.sub(from);
        return from.add(diff.mul(r));
    }
    public static LerpNum(from: number, to: number, r: number): number {
        let diff = to - from;
        return from + diff * r;
    }
    //public static RandomGetPos(ranx, rany, count, space: number, outPosArray: List<number>) {
    //    console.log("gen::");
    //    if (count <= 0) return;
    //    count--;
    //    if (rany - ranx < space) return;
    //    let z = Random.RangeInt(ranx, rany);
    //    outPosArray.Add(z);
       
    //    if (Random.Range(0, 100) < 50) {
    //        this.RandomGetPos(ranx, z - space, count, space, outPosArray);
    //    } else {
    //        this.RandomGetPos(z + space, rany, count, space, outPosArray);
    //    }
    //}
}
