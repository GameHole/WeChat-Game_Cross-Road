import UIMap from "./UIMap";
import GameCoordinate from "./GameCoordinate";
import Car from "./Car";
import Random from "./Random";
import ResouseData from "./Res/ResouseData";
import EventNames from "./EventNames";
import EventUtility from "./Utility/EventUtility";
import Tags from "./TriggerDealers/Tags";
import ItemData from "./TriggerDealers/ItemData";
import PoolUtility from "./Utility/PoolUtility";
import NeedLayer from "./NeedLayer";
import ReferSelf from "./ReferSelf";
import RefArray from "./RefArray";
import CarUtility from "./Utility/CarUtility";
const { ccclass, property } = cc._decorator;

@ccclass
export default class CarGenor extends cc.Component/* implements IDisposable*/ {
    private startPoint: cc.Vec2;
    private endPoint: cc.Vec2;
    private data: ResouseData;
    private time: number = 0;
    private add: number = 0;
    private array = new Array<cc.Node>();
    private refArray = new RefArray();
    public speed: number;
    private takeIndex;
    private index: number;
    update(dt) {
        if (!ItemData.isPause) {
            this.add += dt;
            if (this.add >= this.time) {
                this.add = 0;
                this.Create(this.startPoint).Run();
            }
        }
    }
    public Run(speedMin: number, speedMax: number, takeIndex) {
        this.speed = Random.Range(speedMin, speedMax);
        this.time = 100 * Random.Range(8, 13) / this.speed;
        this.data = cc.find("Canvas/CarData").getComponent(ResouseData);
        this.index = 0;
        this.takeIndex = takeIndex;
        let uimap = cc.find("UiMap").getComponent(UIMap);
        let ymax = uimap.width + uimap.sideSizeDown + uimap.sideSizeUp;
        let x = uimap.length - 1;
        if (Random.Range(0, 10) >= 5) {
            this.startPoint = GameCoordinate.ToUIPosition(new cc.Vec2(x, ymax));
            this.endPoint = GameCoordinate.ToUIPosition(new cc.Vec2(x, 0));
        } else {
            this.startPoint = GameCoordinate.ToUIPosition(new cc.Vec2(x, 0));
            this.endPoint = GameCoordinate.ToUIPosition(new cc.Vec2(x, ymax));
        }
        let dir = this.endPoint.sub(this.startPoint);
        let len = dir.mag();
        let count = Math.floor(len / (this.speed * this.time));
        for (var i = 0; i < count; i++) {
            this.Create(this.startPoint.add(dir.mul(i / count))).Run();
        }
	}

    private Create(stat: cc.Vec2): Car {
  //      let clone: cc.Node = PoolUtility.Instance(this.data.other[this.takeIndex()]);//*/ cc.instantiate(this.data.other[this.takeIndex()]);
		//let car = clone.getComponent(Car);
		//if (clone.parent != this.node)
		//	clone.parent = this.node;
  //      //clone.scale *= GameCoordinate.scale;
  //      car.shadow = this.data.textures[0];
  //      car.Init(stat, this.endPoint, this.speed);
  //      PoolUtility.getorAddComponent(NeedLayer, car);//*/ car.addComponent(NeedLayer);
		//      let ref = car.getComponent(ReferSelf);
		let ref = CarUtility.CreateACar(this.data, this.takeIndex());
		this.refArray.Add(ref);
		let car = ref.getComponent(Car);
		car.Init(stat, this.endPoint, this.speed);
        //this.array.push(clone);
		return car;
	}
	onDestroy() {
		//for (var i = 0; i < this.array.length; i++) {
		//	if (this.array[i].isValid)
		//		this.array[i].destroy();
		//}
		//this.refArray.foreach((e) => {
		//	PoolUtility.Destroy(e.node);
		//});
		CarUtility.DestroyCars(this.refArray);
	}
}
