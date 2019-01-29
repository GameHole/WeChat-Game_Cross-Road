import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
import Trigger from "../../Trigger";
import TrigerUtility from "../../Utility/TrigerUtility";
import Mirror from "./Mirror";
import UIGround from "../../UIGround";
import Random from "../../Random";
import Transform from "../../../Transform/Transform";
import GameCoordinate from "../../GameCoordinate";
import PoolUtility from "../../Utility/PoolUtility";
import List from "../../../System/List";
import MathUtility from "../../Utility/MathUtility";
class Ran {
    private low: number = 0;
    private hight: number = 0;
    private space: number = 0;
    public constructor(low, hight, space) {
        this.low = low;
        this.hight = hight;
        this.space = space;
        //console.log(low, hight);
    }
    public isValid() {
       
        return this.hight - this.low >= this.space;
    }
    public Run(res: List<number>, count) {
        if (!this.isValid() || count <= 0) return;
        count--;
        let z = Random.RangeInt(this.low, this.hight);
        //console.log("z::" + z);
        res.Add(z);
        let lift = new Ran(this.low, z - this.space, this.space);
        let right = new Ran(z + this.space, this.hight, this.space);
        let run: Ran;
        if (Random.Range(0, 100) < 50) {
            run = lift;
            if (!run.isValid())
                run = right;
        } else {
            run = right;
            if (!run.isValid())
                run = lift;
        }
        if (run)
            run.Run(res, count);
    }
}


export default class AddRiver extends Action {
    public Execute(input: Array<ResouseData>, output: UIMap): boolean {
        let river = input[4];
        river.currentSp = river.textures[0];
        let uig0 = output.AddLine(river);
		uig0.wayType = "River";
		TrigerUtility.AddWater(output, 0.2);
        river.currentSp = river.textures[1];
        let uig1 = output.AddLine(river);
        uig1.wayType = "River";
        TrigerUtility.AddWater(output, 0.2);
        let poss = this.RandomGetPos(output.sideSizeDown + 1, output.sideSizeDown + output.width - 1, 3, 2);
        for (var i = 0; i < poss.Count; i++) {
            let x = poss.Get(i);

            this.removeTriggers(uig0.Get(x));
            this.removeTriggers(uig1.Get(x));
            //uig1.Get(x).getComponent(Trigger).Destroy();
			uig0.AddOther(this.AddBridge(river, uig0.Get(x), uig1.Get(x)));
		}
        return true;
    }
    private removeTriggers(tran: Transform) {
        let trias = tran.getComponents(Trigger);
        for (var i = 0; i < trias.length; i++) {
            trias[i].Destroy();
        }
    }
    private AddBridge(river: ResouseData, tran0: Transform, tran1: Transform): cc.Node {
		let brige = /*PoolUtility.Instance(river.other[0]);*/ cc.instantiate(river.other[0]) as cc.Node;
		cc.find("Canvas/Obs").insertChild(brige,0);// river.node;
        let dir = GameCoordinate.InverseTransformDir(cc.Vec2.UP.mul(-40));
        let bt =/* PoolUtility.getorAddComponent(Transform, brige);//*/brige.addComponent(Transform);
        bt.Position = tran0.Position.add(tran1.Position).mul(0.5).add(dir);
        //brige.scale = 0.5;
        return brige;
    }
    private RandomGetPos(ranx: number, rany: number, count: number, space: number): List<number> {
        let x = new Ran(ranx, rany, space);
        let list = new List<number>();
        x.Run(list, count);
        return list;
    }
}
