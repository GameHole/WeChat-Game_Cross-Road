import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
import CarGenor from "../../CarGenor";
import Random from "../../Random";
import PoolUtility from "../../Utility/PoolUtility";

export default class AddRanCar extends Action {
    public Execute(input: Array<ResouseData>, output: UIMap): boolean {
		let scale = 1.3;
		AddRanCar.AddCar(input, output, 100 * scale, 400 * scale);
        return true;
    }

    public static AddCar(input: Array<ResouseData>, output: UIMap, minSpeed, maxSpeed, boat: boolean = false): void {
        let carData = input[7];
        let car = output.GetALine(output.length - 1);
        let node = carData.node;
		let carGen = node.addComponent(CarGenor);
        carGen.Run(minSpeed, maxSpeed, () => {
            if (!boat)
                return Random.RangeInt(1, carData.other.length);
            else
                return 0;
        });
        car.AddOther(carGen);
    }
}
