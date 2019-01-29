import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
import Mirror from "./Mirror";
import Transform from "../../../Transform/Transform";
import TrafficCars from "../../Traffic/TrafficCars";
import Trafficlight from "../../Traffic/Trafficlight";
import PoolUtility from "../../Utility/PoolUtility";
import ReferSelf from "../../ReferSelf";
const {ccclass, property} = cc._decorator;

@ccclass
export default class AddTraffic extends Action {
	public Execute(input: Array<ResouseData>, output: UIMap): boolean {
		//console.log("AddTraffic Run");
		let traffic = input[9];
		let road = input[0];
		for (var i = 0; i < 2; i++) {
			output.AddLine(road, false).wayType = "Traffic";
		}
		Mirror.mirror(output.GetALine(output.length - 1));
        let x = output.length - 2;
        let trafficLight =/* PoolUtility.Instance(traffic.other[0]);//*/ cc.instantiate(traffic.other[0]) as cc.Node;
		trafficLight.parent = cc.find("Canvas/Hiest");
		let tran = trafficLight.addComponent(Transform);
        tran.Position = output.Get(new cc.Vec2(x, output.sideSizeDown)).Position;
        let cars =/* PoolUtility.New("TrafficCars")//*/new cc.Node();
        traffic.node.insertChild(cars, 0);
       /* PoolUtility.getorAddComponent(TrafficCars, cars)*/cars.addComponent(TrafficCars).Init(trafficLight.getComponent(Trafficlight), x);
		let line = output.GetALine(x);
		line.AddOther(trafficLight);
		line.AddOther(cars);
		return true;
	}
}
