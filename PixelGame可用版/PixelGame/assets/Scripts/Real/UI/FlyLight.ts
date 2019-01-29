import List from "../../System/List";
import Random from "../Random";
import UIMoveto from "../RoleSelector/UIMoveto";
import GameCoordinate from "../GameCoordinate";

const {ccclass, property} = cc._decorator;
@ccclass
export default class FlyLight extends cc.Component {
    @property(cc.Prefab)
    prefab: cc.Prefab = null;
    private list: List<UIMoveto> = new List<UIMoveto>();
    private dir: cc.Vec2 = null;
    start() {
        this.dir = GameCoordinate.Size.normalize();
        this.isStart = true;
    }
    //public Start() {
    //    let len = Random.RangeInt(3, 10);
    //    //let dif = len - this.list.Count;
    //    //if (dif > 0) {
    //    //    for (let i = 0; i < dif; i++) {
    //    //        this.list.Add(cc.instantiate(this.prefab));
    //    //    }
    //    //} else {
    //    //    for (let i = len; i < this.list.Count; i++) {
    //    //        this.list.Get(i).active = false;
    //    //    }
    //    //}
    //    //for (var i = 0; i < len; i++) {
    //    //    this.list.Add();
    //    //}
    //}
    private isStart = false;
    private add = 0;
    private time = 0;
    update(dt) {
        if (this.isStart) {
            this.add += dt;
            if (this.add >= this.time) {
                this.add = 0;
                this.time = Random.Range(0.2, 1);
                let uito = this.create();
                let start = new cc.Vec2(Random.Range(-1080.0, 1080.0) / 2, Random.Range(-1920, 1920) / 2);
                uito.Run(start, start.add(this.dir.mul(1000)));
            }
        }
    }
    private create() {
        return cc.instantiate(this.prefab).addComponent(UIMoveto);
    }
}
