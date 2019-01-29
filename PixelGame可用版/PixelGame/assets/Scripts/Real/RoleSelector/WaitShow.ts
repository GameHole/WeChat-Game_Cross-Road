const {ccclass, property} = cc._decorator;
@ccclass
export default class WaitShow extends cc.Component {
    private isStart;
    private waitTime;
    private add: number;
    private func;
    public get curTime() { return this.add; }
    public get isRun() { return this.isStart; }
    public Run(wait: number,callback) {
        this.waitTime = wait;
        this.isStart = true;
        this.add = 0;
        this.func = callback;
    }
    public Stop() {
        this.isStart = false;
    }
    public Reset() {
        this.add = 0;
    }
    update(dt) {
        if (this.isStart) {
            this.add += dt;
            if (this.add >= this.waitTime) {
                this.isStart = false;
                this.add = 0;
                if (this.func != null) {
                    this.func();
                }
            }
        }
    }
}
