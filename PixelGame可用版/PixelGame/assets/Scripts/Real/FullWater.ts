const {ccclass, property} = cc._decorator;
@ccclass
export default class FullWater extends cc.Component {
    public Close() {
        this.node.active = false;
    }
    public Open() {
        this.node.active = true;
        this.getComponent(cc.Animation).play();
    }
}
