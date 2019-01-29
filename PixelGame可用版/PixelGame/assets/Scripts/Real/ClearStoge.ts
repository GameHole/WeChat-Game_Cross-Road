import Wx from "./WXAPI/wx";

const {ccclass, property} = cc._decorator;
@ccclass
export default class ClearStoge extends cc.Component {
    onLoad() {
        Wx.SafeCall((wx) => {
            wx.clearStorage();
        });
    }

    // start () {}

    // update (dt) {}
}
