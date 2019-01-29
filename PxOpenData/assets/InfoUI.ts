const {ccclass, property} = cc._decorator;
@ccclass
export default class InfoUI extends cc.Component {
    private head: cc.Sprite;
    private nameTx: cc.Label;
    private score: cc.Label;
    private ranking: cc.Label;
    public Init(headUrl: string, name: string, score: string, ranking: string) {
        this._init();
        this.nameTx.string = name;
        this.score.string = score;
        this.ranking.string = ranking;
        this.downLoadHead(headUrl);
    }
    private _init() {
        if (this.head == null)
            this.head = this.getComponentFromChildren(cc.Sprite, "Head");
        if (this.nameTx == null)
            this.nameTx = this.getComponentFromChildren(cc.Label, "Name");
        if (this.score == null)
            this.score = this.getComponentFromChildren(cc.Label, "Score");
        if (this.ranking == null)
            this.ranking = this.getComponentFromChildren(cc.Label, "Ranking");
    }
    private getComponentFromChildren<T extends cc.Component>(type: { prototype: T }, name: string): T {
        return this.node.getChildByName(name).getComponent(type);
    }
    private downLoadHead(url: string) {
        //cc.loader.load(url, (err, res) => {
        //    if (err) console.log("downLoadHead err");
        //    this.head.spriteFrame = new cc.SpriteFrame(res);
        //});
        cc.loader.load({
            url: url, type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            this.head.spriteFrame = new cc.SpriteFrame(texture);
        });
    }
}
