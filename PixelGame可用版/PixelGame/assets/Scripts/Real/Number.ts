import ResouseData from "./Res/ResouseData";

const { ccclass, property } = cc._decorator;
@ccclass
export default class Number extends cc.Component {
    private datas: ResouseData;
	private array = new Array<cc.Sprite>();
	private layer: cc.Layout;
	private _init() {
		if (this.datas == null)
			this.datas = cc.find("NumberData").getComponent(ResouseData);
		if (this.layer == null)
			this.layer = this.getComponent(cc.Layout);
	}
    private AddASp() {
        let child =new cc.Node();
		this.array.push(child.addComponent(cc.Sprite));
		if (this.layer.horizontalDirection == cc.Layout.HorizontalDirection.LEFT_TO_RIGHT)
			child.parent = this.node;
		else
			this.node.insertChild(child, 0);
        child.color = this.node.color;
        child.scale *= 2;
    }
	public SetNumber(num: number) {
		this._init();
        let sNum = num.toString();
        let add = sNum.length - this.array.length;
        for (let i = 0; i < this.array.length; i++)
            this.array[i].node.active = true;
        if (add > 0) {
            for (let i = 0; i < add; i++)
                this.AddASp();
        }
        else {
            for (let i = sNum.length; i < this.array.length; i++)
                this.array[i].node.active = false;
        }
        for (let i = 0; i < sNum.length; i++) {
            this.array[i].spriteFrame = this.datas.textures[sNum[i]];
            // console.log(this.array[i].node.getContentSize());
        }
    }
    public TakeANumList(value: number, output: Array<number>) {
        let x = value % 10;
        output.push(x);
        let y = Math.floor(value / 10);
        if (y == 0) return;
        this.TakeANumList(y, output);
    }
}
