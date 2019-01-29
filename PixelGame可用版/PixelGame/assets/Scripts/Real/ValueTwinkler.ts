const {ccclass, property} = cc._decorator;
@ccclass
export default class ValueTwinkler extends cc.Component {
    private isStart: boolean;
    private add: number = 0;
    public F: number = 0.2;
    private side: boolean = true;
    private first: Function;
    private second: Function;
    public duration: number = 1.5;
    public Run(first, second) {
        this.first = first;
        this.second = second;
        this.init();
    }
    private init() {
        this.isStart = true;
        this.reset();
        this.twinke();
    }
    public Stop() {
        this.isStart = false;
        this.reset();
    }
    public reset() {
        this.add = 0;
        this.cou = 0;
    }
    private cou: number = 0;//ʱ�������������ɾ��
    update(dt) {
        if (this.isStart) {
            this.cou += dt;//ʱ�������������ɾ��
            if (this.cou >= this.duration) {
                this.Stop();
                return;
            }
            this.add += dt;
            if (this.add >= this.F / 2) {
                this.twinke();
                this.add = 0;
            }
        }
    }
    private twinke() {
        if (this.side) {
            this.first();
        } else {
           
            this.second();
        }
        this.side = !this.side;
    }
}
