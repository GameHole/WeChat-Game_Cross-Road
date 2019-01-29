import InfoUI from "./InfoUI";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Infos extends cc.Component {
    @property(cc.Prefab)
    infoPrefab: cc.Prefab = null;
    @property(cc.Node)
    parent: cc.Node = null;
    private list = new Array<InfoUI>();
    public Create(): void {
        let clone = cc.instantiate(this.infoPrefab) as cc.Node;
        clone.parent = this.parent;
        let info = clone.getComponent(InfoUI);
        this.list.push(info);
    }
    public Init(ranks) {
        ranks = this.sort(ranks);
        let add = ranks.length - this.list.length;
        for (let i = 0; i < this.list.length; i++)
            this.list[i].node.active = true;
        if (add > 0) {
            for (let i = 0; i < add; i++)
                this.Create();
        }
        else {
            for (let i = ranks.length; i < this.list.length; i++)
                this.list[i].node.active = false;
        }
        for (let i = 0; i < ranks.length; i++) {
            let rankInfo = ranks[i];
            let v = "0";
            if (rankInfo.KVDataList.length > 0)
                v = rankInfo.KVDataList[0].value;
            this.list[i].Init(rankInfo.avatarUrl, rankInfo.nickname, v, (i + 1).toString());
        }
    }
    private sort(ranks) {
        return ranks.sort((a, b) => { return Math.sign(b.KVDataList[0].value - a.KVDataList[0].value); });
    }
}
