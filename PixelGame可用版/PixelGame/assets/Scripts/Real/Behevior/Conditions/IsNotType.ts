import IsType from "./IsType";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
export default class IsNotType extends IsType {
    public Execute(input: Array<ResouseData>, output: UIMap): boolean {
        return output.GetLineType(output.length - this.offset) != this.type;
    }
}
