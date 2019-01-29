import Wx from "./WXAPI/wx";
import Infos from "./Infos";
import SaveUtility from "./SaveUtility";

const {ccclass, property} = cc._decorator;
@ccclass
export default class WxOpedData extends cc.Component {
    @property(Infos)
    infos: Infos = null;
    start() {
        Wx.Listen();
        let log = (res) => { console.log(res) };
        let error = (res) => { console.error(res) };
        Wx.Regist("SetBest", (args) => {
            Wx.setUserCloudStorage(args.key, args.value, null, error);
        });
        //Wx.Regist("GetBest", (args) => {
        //    //Wx.SafeCall((wx) => {
        //    //    //wx.getUserCloudStorage(Object object)
                
        //    //});
        //    SaveUtility.SetItem("testtttt", 5);
        //   // Wx.getFriendCloudStorage(args.key, args.value, null, error);
        //});
        Wx.Regist("ShowRank", (args) => {
            Wx.getFriendCloudStorage(["score"], (res) => {
                this.infos.Init(res.data);
                console.log(res);
            }, error);
        });
    }
}
