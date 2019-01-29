import DeadUI from "./DeadUI";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import ErrShow from "./ErrShow";
import StartUtility from "../Utility/StartUtility";
const { ccclass, property } = cc._decorator;

@ccclass
export default class UIMgr extends cc.Component {
	@property(cc.Node)
	gamingUI: cc.Node = null;
    @property(cc.Node)
	menus: cc.Node = null;
	@property(ErrShow)
	err: ErrShow= null;
    private deadUI: cc.Node;
    private startUI: cc.Node;
    onLoad() {
        this.deadUI = this.menus.getChildByName("DeadUI");
		this.startUI = this.menus.getChildByName("StartUI");
		
		EventUtility.Regist(EventNames.onUploadScoreErr, (e) => {
			this.err.Open(e);
		})
		EventUtility.Regist(EventNames.onPlayerDead, () => {
			
            this.menus.active = true;
			this.gamingUI.active = false;
		})
		StartUtility.Start(() => {
			this.err.Close();
		});
    }
    public OpenStart(open: boolean) {
        this.startUI.active = open;
        this.deadUI.active = !open;
    }
}
