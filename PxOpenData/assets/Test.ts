import Wx from "./WXAPI/wx";

const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
    onLoad() {
        console.log("sub Start")
    }
    start() {
        //Wx.Send("test", null);
       
    }

    // update (dt) {}
}
