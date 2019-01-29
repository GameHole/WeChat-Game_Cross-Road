
const {ccclass, property} = cc._decorator;
@ccclass
export default class UIJump extends cc.Component {
    @property()
    public vy: number = 0;
    @property()
    public g: number = -100;
    @property()
    public ground: number = 0;
    private isRun: boolean = false;
    //start() {
    //    this.isRun = true;
    //}
    public Run() {
        this.isRun = true;
    }
    update(dt) {
        if (this.isRun) {
            if (this.node.y <= this.ground) {
                this.node.y = this.ground;
                return;
            }
            this.node.y += this.vy * dt;
            this.vy += this.g * dt;
        }
    }
}
