import Wx from "../WXAPI/wx";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Rank extends cc.Component {
    public OpenUI() {
        Wx.Send("ShowRank", null);
        this.node.active = true;
    }
    public CloseUI() {
        this.node.active = false;
    }
}
