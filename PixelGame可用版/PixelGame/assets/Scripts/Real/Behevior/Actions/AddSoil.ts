import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
const {ccclass, property} = cc._decorator;

@ccclass
export default class AddSoil extends Action {
    public Execute(input:Array<ResouseData>, output:UIMap): boolean{
        let uig=output.AddLine(input[5]);
        uig.wayType="Soil";
        return true;
    }
}
