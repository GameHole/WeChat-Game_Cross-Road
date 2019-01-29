const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class ActionTo extends cc.Component {
    private psatrt;
    private pend;
    private onOver: Function;
	private onframe: Function;
	private isRun: boolean = false;
    private add: number;
    @property()
    public speed: number = 8.5;
    public get IsRun(): boolean { return this.isRun; }
    public Run(start, end, onframe: Function = null, over: Function = null) {
        this.pend = end;
        this.psatrt = start;
        this.onOver = over;
        this.onframe = onframe;
        this.add = 0;
        this.isRun = true;
    }
    public Stop() {
        this.isRun = false;
	}
	protected update(dt) {
		
        if (this.isRun) {
			this.add += this.speed * dt;
            this.Lerp(this.psatrt, this.pend,this.add);
            if (this.onframe) this.onframe(dt);
            if (this.add >= 1) {
                this.isRun = false;
                this.End(this.pend);
                if (this.onOver != null) this.onOver();
            }
        }
    }
    protected abstract Lerp(start,end,add: number);
    protected abstract End(end);
}
