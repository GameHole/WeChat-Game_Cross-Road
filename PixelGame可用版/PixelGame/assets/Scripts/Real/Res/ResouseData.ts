import Random from "../Random";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResouseData extends cc.Component {
    @property(cc.SpriteFrame)
    textures = [];
    @property(cc.Prefab)
    obstacles = [];
    @property(cc.Prefab)
    other = [];
    public currentSp: cc.SpriteFrame;
    public currentOb: cc.Prefab;
    public onLoad() {
        this.currentSp = this.textures[0];
        this.currentOb = this.obstacles[0];
    }
	public RandomObs() {
		if (this.obstacles.length <= 1) return;
		this.currentOb = this.obstacles[Random.RangeInt(0, this.obstacles.length)];
	}
}
