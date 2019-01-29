import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
import Random from "../../Random";
export default class SimpleRandom extends Action {
	private max: number;
	public constructor(max: number) {
        super();
        this.max = max;
    }
	public Execute(input: Array<ResouseData>, output: UIMap): boolean {
		return Random.Range(0, 100) <= this.max;
    }
}
