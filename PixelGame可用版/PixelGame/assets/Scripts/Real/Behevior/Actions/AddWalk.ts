import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
const {ccclass, property} = cc._decorator;

@ccclass
export default class AddWalk extends Action {
    public Execute(input:Array<ResouseData>, output:UIMap): boolean{
        let uig=output.AddLine(input[2]);
        uig.wayType="Walk";
        // output.AddRanObs(uig,input[2]);
        //console.log("AWake");
        return true;
    }
}
