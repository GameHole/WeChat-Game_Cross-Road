
import UIMgr from "./UI/UIMgr";
import SceneUtility from "./Utility/SceneUtility";
import PlayerUIs from "./PlayerUIs";
import RoleSelector from "./RoleSelector/RoleSelector";
import RoleDataUtility from "./Utility/RoleDataUtility";
import SoundUtility from "./Utility/SoundUtility";
import SoundId from "./Sounds/SoundId";
import StartUtility from "./Utility/StartUtility";
import Wx from "./WXAPI/wx";
import WxAudioPlayer from "./Sounds/WxAudioPlayer";
import EventUtility from "./Utility/EventUtility";
import EventNames from "./EventNames";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMgr extends cc.Component {
    @property(UIMgr)
    uiMgr: UIMgr = null;
    @property(PlayerUIs)
    playerUI: PlayerUIs = null;
    @property(RoleSelector)
	roleSelector: RoleSelector = null;
    private static isGameStarted;
    public static get isStarted() { return this.isGameStarted; }
    public static StartGame() {
        this.isGameStarted = true;
    }
    public static RetuenStart() {
		this.isGameStarted = false;
		SceneUtility.LoadScene(null, () => {
			EventUtility.Fire(EventNames.onReturnMenu);
		});
    }
	private au: WxAudioPlayer = null;
    start() {
        this.au = SoundUtility.Play(SoundId.BGM, true, 0.5);
        EventUtility.Regist(EventNames.onOpenAd, (open: boolean) => {
            if (open) this.au.Stop();
            else this.au.Play();
        });
        StartUtility.Start(() => {
            this.uiMgr.gamingUI.active = GameMgr.isGameStarted;
            this.uiMgr.menus.active = !GameMgr.isGameStarted;
            this.uiMgr.OpenStart(!GameMgr.isGameStarted);
            let v = 0.95;
            if (!GameMgr.isStarted) {
                v = 0.5;
            }
            this.au.volume = v;
            this.au.loop = true;
            this.au.Play();
        });
    }
    public GameStart() {
		let xy = RoleDataUtility.TakeUsefull(this.roleSelector.currentX, this.roleSelector.currentY);
		this.roleSelector.saveLastSelect(xy);
		this.playerUI.SetCurrent(xy.x, xy.y);
		SoundUtility.Play(SoundId.EnterGame);
		EventUtility.Fire(EventNames.onGameStart);
        SceneUtility.LoadScene(() => { GameMgr.StartGame();});
    }
}
