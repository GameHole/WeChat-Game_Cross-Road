import MathUtility from "./Utility/MathUtility";
enum State { add, sub }
const { ccclass, property } = cc._decorator;

@ccclass
export default class UIScalor extends cc.Component {
    private isRun: boolean = false;
    private state: State = State.add;
    private old;
    @property()
    speed: number = 12;
    start() {
        this.old = 1;// this.node.scale;
        //console.log(this.old);
    }
    public Run() {
        this.node.scale = 0;
        this.isRun = true;
    }
    public Stop() {
        this.node.scale = this.old;
        this.isRun = false;
    }
    update(dt) {
        if (this.isRun) {
            switch (this.state) {
                case State.add:
                    this.node.scale = MathUtility.LerpNum(this.node.scale, 0.9, dt * 5);
                    if (this.node.scale >= 0.95) {
                        this.state = State.sub;
                        this.node.scale = 0.7;
                    }
                    break;
                case State.sub:
                    this.node.scale = MathUtility.LerpNum(this.node.scale, 1, dt * 8);
                    break;
            }
        }
    }
}
