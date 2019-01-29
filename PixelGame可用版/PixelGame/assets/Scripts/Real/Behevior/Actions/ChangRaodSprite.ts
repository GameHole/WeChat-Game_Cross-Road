import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
export default class ChangRaodSprite extends Action {
    private index;
    public constructor(index: number) {
        super();
        this.index = index;
    }
    public Execute(input: Array<ResouseData>, output: UIMap): boolean {
        let x = output.GetALine(output.length - 1);
        for (let i = 0; i < x.length; i++) {
            x.Get(i).getComponent(cc.Sprite).spriteFrame = input[0].textures[this.index];
        }
        return true;
    }
}
