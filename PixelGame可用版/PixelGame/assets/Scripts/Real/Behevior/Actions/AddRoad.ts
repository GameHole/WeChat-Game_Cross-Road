import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
export default class AddRoad extends Action {
    public Execute(input: Array<ResouseData>, output: UIMap): boolean {
        let uig = output.AddLine(input[0]);
        uig.wayType = "Road";
        return true;
    }
}
