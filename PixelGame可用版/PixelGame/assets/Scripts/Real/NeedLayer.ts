import Transform from "../Transform/Transform";
import Camera from "./Camera";
import MathUtility from "./Utility/MathUtility";
import GameCoordinate from "./GameCoordinate";

const {ccclass, property} = cc._decorator;
@ccclass
export default class NeedLayer extends cc.Component {
    @property()
    parent: boolean = false;
    update(dt) {
        let transform = this.getComponent(Transform)
        if (transform != null)
            if (transform.Position != null) {
                let node = this.node;
                if (this.parent)
                    node = this.node.parent;
                node.zIndex = -GameCoordinate.TransformDir(transform.Position).x/100//MathUtility.Distance(transform.Position, Camera.main.Position.sub(Camera.main.Projection));
                //console.log(node.name + "  dis" + node.zIndex);
            }
    }
}
