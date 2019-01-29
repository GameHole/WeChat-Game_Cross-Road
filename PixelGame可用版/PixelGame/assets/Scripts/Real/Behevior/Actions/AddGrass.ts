import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
export default class AddGrass extends Action {
    public isAddOb: boolean = true;
    public Execute(input: Array<ResouseData>, output: UIMap): boolean {
        let uig = output.AddLine(input[1], this.isAddOb);
        // output.AddRanObs(uig,input[1]);
        uig.wayType = "Grass";
        //console.log("AGrass");
        return true;
    }
}
