import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
const { ccclass, property } = cc._decorator;

@ccclass
export default class IsType extends Action {
    protected type: string;
    protected offset: number;
    public constructor(tyep: string, offset = 1) {
        super();
        this.type = tyep;
        this.offset = offset;
    }
    public Execute(input: Array<ResouseData>, output: UIMap): boolean {
        return output.GetLineType(output.length - this.offset) == this.type;
    }
}
