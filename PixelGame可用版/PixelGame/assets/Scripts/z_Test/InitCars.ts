import Car from "../Real/Car";
const { ccclass, property } = cc._decorator;

@ccclass
export default class InitCars extends cc.Component {
	@property(cc.SpriteFrame)
	shadow: cc.SpriteFrame = null;
    @property(Car)
    cars = new Array<Car>();
    start() {
        for (let i = 0; i < this.cars.length; i++) {
            if (this.cars[i] != null) {
				this.cars[i].shadow = this.shadow;
				this.cars[i]._Start();
				this.cars[i].Init(new cc.Vec2(0, 0), new cc.Vec2(0, 0), 0);
            }
        }
    }
}
