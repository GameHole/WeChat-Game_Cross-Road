const {ccclass, property} = cc._decorator;
@ccclass
export default class WxTest extends cc.Component {
    // onLoad () {}
    @property(cc.Node)
    ccc: cc.Node = null;
    start() {
        let wx = window["wx"];
        if (wx != null) {
            console.log(this.ccc.active);
            let button = wx.createUserInfoButton({
                type: 'text',
                text: '获取用户信息',
                style: {
                    left: 50,
                    top: 50,
                    width: 100,
                    height: 100,
                    lineHeight: 40,
                    backgroundColor: '#eeeeee',
                    color: '#000000',
                    textAlign: 'center',
                    fontSize: 10,
                    borderRadius: 3
                }
            });
            button.onTap((res) => {
                console.log(res);
                wx.getOpenDataContext().postMessage({
                    message: "User info get success."
                });
                this.ccc.active = true;
            });
        }
    }

    // update (dt) {}
}
