import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
import Transform from "../../../Transform/Transform";
import GameCoordinate from "../../GameCoordinate";
import UIGround from "../../UIGround";
import AddRanCar from "./AddRanCar";
import Random from "../../Random";
import Trigger from "../../Trigger";
import Tags from "../../TriggerDealers/Tags";
import PoolUtility from "../../Utility/PoolUtility";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AddHightWay extends Action {
    public Execute(input: Array<ResouseData>, output: UIMap): boolean {
        let hi = input[6];
        hi.currentSp = hi.textures[0];
        let uigl = output.AddLine(hi);
		uigl.wayType = "HightWay";
		let scale = 1.3;
        for (let i = 0; i < 2; i++) {
            hi.currentSp = hi.textures[2];
            let line = output.AddLine(hi);
			line.wayType = "HightWay";
			AddRanCar.AddCar(input, output, 500 * scale, 700 * scale);
        }
        hi.currentSp = hi.textures[1];
        let uigr = output.AddLine(hi);
		uigr.wayType = "HightWay";
        let leftoffset = GameCoordinate.InverseTransformDir(cc.Vec2.UP.mul(GameCoordinate.Size.mag() / 4+15).sub(cc.Vec2.RIGHT.mul(68)));
		this.AddLine(output, hi, uigl, 5, leftoffset, hi.node/* cc.find("Canvas/O/Hiest")*/);
		this.AddLine(output, hi, uigl, 0, leftoffset, hi.node/* cc.find("Canvas/O/Hiest")*/);
        this.AddLine(output, hi, uigr, 3, GameCoordinate.InverseTransformDir(cc.Vec2.UP.mul(GameCoordinate.Size.mag() / 4+10).add(cc.Vec2.RIGHT.mul(90))), hi.node);
        return true;
    }

    private AddLine(output: UIMap, hi: ResouseData, uig: UIGround, x: number, offset: cc.Vec2, parent: cc.Node) {
        let node =/* PoolUtility.Instance(hi.other[0]);//*/ cc.instantiate(hi.other[0]) as cc.Node;
        node.parent = parent;
        node.scale = 1.3;
        let trig = /*PoolUtility.getorAddComponent(Trigger, node);//*/ node.addComponent(Trigger);
		trig.Init(Tags.Obstacle);
        trig.SetSize(new cc.Vec2(25, 160));
        let tran =/* PoolUtility.getorAddComponent(Transform, node);//*/ node.addComponent(Transform);
		tran.Position = uig.Get(output.sideSizeDown + x).Position.add(offset);
        uig.AddOther(node);
    }
}
