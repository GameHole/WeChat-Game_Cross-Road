import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
import TrigerUtility from "../../Utility/TrigerUtility";
import AddRanCar from "./AddRanCar";
import Random from "../../Random";
import Trigger from "../../Trigger";
import Tags from "../../TriggerDealers/Tags";
import Transform from "../../../Transform/Transform";
import PoolUtility from "../../Utility/PoolUtility";
export default class AddBitch extends Action {
    public Execute(input: Array<ResouseData>, output: UIMap): boolean {
        let bichData = input[3];
        bichData.currentSp = bichData.textures[0];
        let uig = output.AddLine(bichData);
        uig.wayType = "Bitch";
        let count = Random.RangeInt(2, 4);
        let used = new Array<number>();
        for (var i = 0; i < count;) {
            let pos = Random.RangeInt(output.sideSizeDown, output.sideSizeDown + output.width);
            if (this.contact(used, pos)) {
                let pos = Random.RangeInt(output.sideSizeDown, output.sideSizeDown + output.width);
                continue;
            }
            used.push(pos);
            let swing =/* PoolUtility.Instance(bichData.other[0]); //*/cc.instantiate(bichData.other[0]) as cc.Node;
			swing.parent = bichData.node;
			console.log("sw::" + swing.getComponent(cc.Sprite));
            /*PoolUtility.getorAddComponent(Transform, swing)*/swing.addComponent(Transform).Position = uig.Get(pos).Position;
            let tri =/* PoolUtility.getorAddComponent(Trigger, swing);//*/ swing.addComponent(Trigger);
            tri.Init(Tags.Swing);
            tri.SetScale(0.3);
            uig.AddOther(swing);
            i++;
        }
        bichData.currentSp = bichData.textures[2];
        for (let i = 0; i < 2; i++) {
            uig = output.AddLine(bichData);
			uig.wayType = "Water";
            TrigerUtility.AddWater(output, 0.2);
            AddRanCar.AddCar(input, output, 300, 400, true);
        }
        bichData.currentSp = bichData.textures[1];
        uig = output.AddLine(bichData);
        uig.wayType = "Bitch";
        return true;
    }
    private contact(list: Array<number>, num: number): boolean{
        for (var i = 0; i < list.length; i++) {
            if (list[i] == num)
                return true;
        }
        return false;
    }
}
