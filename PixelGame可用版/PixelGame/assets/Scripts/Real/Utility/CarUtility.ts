import ResouseData from "../Res/ResouseData";
import ReferSelf from "../ReferSelf";
import PoolUtility from "./PoolUtility";
import NeedLayer from "../NeedLayer";
import Car from "../Car";
import RefArray from "../RefArray";

export default class CarUtility  {
	public static CreateACar(carData: ResouseData, index: number): ReferSelf {
		let clone: cc.Node = PoolUtility.Instance(carData.other[index]);//*/ cc.instantiate(this.data.other[this.takeIndex()]);
		let car = clone.getComponent(Car);
		car.shadow = carData.textures[0];
		car._Start();
		if (clone.parent != carData.node) {
			//console.log("Car::parent");
			clone.parent = carData.node;
		}
		PoolUtility.getorAddComponent(NeedLayer, car);//*/ car.addComponent(NeedLayer);
		return car.getComponent(ReferSelf);
	}
	public static DestroyCar(car: Car) {
		car.getComponent(ReferSelf).RemoveRef();
		PoolUtility.Destroy(car.node);
	}
	public static DestroyCars(refArray: RefArray) {
		refArray.foreach((e) => {
			PoolUtility.Destroy(e.node);
		});
	}
}
