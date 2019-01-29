const {ccclass, property} = cc._decorator;

@ccclass
export default class EventNames{
	public static onGameStart = "onGameStart";
	public static onReturnMenu = "onReturnMenu";
    public static onPlayerDead="onPlayerDead";
	public static onForward = "onForward";
    public static onToucherMove = "onToucherMove";
    public static onCombot = "onCombot";
	public static onRoleChange = "onRoleChange";
    public static onPlaySound = "onPlaySound";
    public static onJumpOver = "onJumpOver";
	public static onEmergencyStop = "onEmergencyStop";
    public static onAir = "onAir";
    public static onPause = "onPause";
    public static onSetCoin = "onSetCoin";
	public static onClear = "onClear";
    public static onLoadScene = "onLoadScene";
    public static onOpenAd = "onOpenAd";
	public static onMule = "onMule";
	public static onUploadScoreErr = "onUploadScoreErr";
	public static updateServer = "updateServer";
}
