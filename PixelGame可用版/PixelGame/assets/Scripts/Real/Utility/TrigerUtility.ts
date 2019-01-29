import UIGround from "../UIGround";
import Trigger from "../Trigger";
import Tags from "../TriggerDealers/Tags";
import ResouseData from "../Res/ResouseData";
import UIMap from "../UIMap";
import Random from "../Random";
import Transform from "../../Transform/Transform";
import GameCoordinate from "../GameCoordinate";
import PoolUtility from "./PoolUtility";

export default class TrigerUtility {
	public static AddWater(output: UIMap, scale = 1) {
		let uiground = output.GetALine(output.length - 1);
        for (let i = output.sideSizeDown; i < output.sideSizeDown + output.width; i++) {
			//let tri = PoolUtility.getorAddComponent(Trigger, uiground.Get(i));
			let tri=uiground.Get(i).addComponent(Trigger);
            tri.Init(Tags.Water);
			tri.SetScale(scale);
			tri.SetSize(new cc.Vec2(100, 50));
        }
    }
   
}
