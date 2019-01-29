import ResouseData from "../Res/ResouseData";
import UIMap from "../UIMap";
import Trafficlight from "./Trafficlight";
import Car from "../Car";
import Random from "../Random";
import GameCoordinate from "../GameCoordinate";
import Transform from "../../Transform/Transform";
import CarRecord from "./CarRecord";
import PoolUtility from "../Utility/PoolUtility";
import RefArray from "../RefArray";
import ReferSelf from "../ReferSelf";
import CarUtility from "../Utility/CarUtility";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TrafficCars extends cc.Component/* implements IDisposable */{
    private carData: ResouseData;
    private uimap: UIMap;
    private posX: number;
    //private cars = new Array<Car>();
    private refCars = new RefArray();
    private speed: number = 2500 * 1.5;
    private dir: cc.Vec2;
    public count = 8;
    private dis = 400;
    private d: number;
    public forward: number;
    _init() {
        this.carData = cc.find("Canvas/CarData").getComponent(ResouseData);
        this.uimap = cc.find("UiMap").getComponent(UIMap);
        this.dir = GameCoordinate.InverseTransformDir(new cc.Vec2(0, 1)).normalize();
        this.d = GameCoordinate.Size.mag() / 2;
        this.forward = this.d * (this.uimap.sideSizeDown + 3);
        this.index = 0;
    }
    public Init(trafficlight: Trafficlight, posX: number) {
        this._init();
        trafficlight.getComponent(Transform).Position =
            GameCoordinate.ToUIPosition(new cc.Vec2(posX, 0)).add(this.dir.mul(this.forward))
                .add(GameCoordinate.InverseTransformDir(new cc.Vec2(-10, 40)));
        this.posX = posX;
        trafficlight.onStateChange = (state: number) => {
            switch (state) {
                case 0:
                    this.GenCars();
                    break;
                case 2:
                    this.Run();
                    break;
            }
        }
    }
    private GenCars() {
        let runx = this.posX + 1;
        for (var x = 0; x < 2; x++) {
            let start = GameCoordinate.ToUIPosition(new cc.Vec2(runx, 0)).sub(this.dir.mul(250));
            let recordEnd = GameCoordinate.ToUIPosition(new cc.Vec2(runx, this.uimap.length + 1));
            for (var i = 0; i < this.count; i++) {
                let local = start.sub(this.dir.mul(i * this.dis));
                let end = local.add(this.dir.mul(this.forward));
                let car = this.Create(local, end);
                car.getComponent(CarRecord).end = recordEnd;
                car.Run();
            }
            runx--;
        }
        //console.log("GenCars");
    }
    private Run() {
        //for (var i = 0; i < this.cars.length; i++) {
        //	if (this.cars[i].node == null) continue;
        //          this.cars[i].autoDestroy = true;
        //          this.cars[i].end = this.cars[i].getComponent(CarRecord).end;
        //          this.cars[i].Run();
        //      }
        //console.log("Runs");
        this.refCars.foreach((item) => {
            let car = item.getComponent(Car);
            car.autoDestroy = true;
            car.end = car.getComponent(CarRecord).end;
            car.Run();
		});
    }
    private index: number;
    private Create(start, end): Car {
        let prefabs = this.carData.other;
        //let clone: cc.Node =/* PoolUtility.Instance(prefabs[Random.RangeInt(1, prefabs.length)]);// */cc.instantiate(prefabs[Random.RangeInt(1, prefabs.length)]);
        //// clone.addComponent(CarRecord);
        
        //let car = clone.getComponent(Car);
        //clone.parent = this.node;
		//car.shadow = this.carData.textures[0];
		let ref = CarUtility.CreateACar(this.carData, Random.RangeInt(1, prefabs.length));
		this.refCars.Add(ref);
		PoolUtility.getorAddComponent(CarRecord, ref);
		let car = ref.getComponent(Car);
        car.Init(start, end, this.speed);
		car.autoDestroy = false;
		//this.cars.push(car);
        //car.id = this.index;
        //this.cars[this.index] = car;
        //car.onDestroydSelf = (id) => {
        //    this.cars[id] = null;
        //}
        //this.index++;
        //this.refCars.Add(car.getComponent(ReferSelf));
        return car;
	}
	onDestroy() {
		//for (var i = 0; i < this.cars.length; i++) {
		//	if (this.cars[i].isValid) {
		//		this.cars[i].node.destroy();
  //          }
		//      }
		CarUtility.DestroyCars(this.refCars);
	}
}
