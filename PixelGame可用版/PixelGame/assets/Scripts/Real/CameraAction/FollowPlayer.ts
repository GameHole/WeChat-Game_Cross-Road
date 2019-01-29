import Transform from "../../Transform/Transform";
import Camera from "../Camera";
import RealPlayer from "../RealPlayer";
import GameCoordinate from "../GameCoordinate";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import ItemData from "../TriggerDealers/ItemData";
import Random from "../Random";
import StartUtility from "../Utility/StartUtility";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FollowPlayer extends cc.Component {
	private camera: Camera;
	private player: Transform;
    @property(RealPlayer)
    public realPlayer: RealPlayer = null;
    @property(cc.Vec2)
	public offset: cc.Vec2 = new cc.Vec2(0, 230);
	@property()
    deadLine: number = 600;
    @property()
    flowSpeed: number = 0.1;
    @property()
    moveSpeed = 0.5;
    private isFired = false;
    public org: number;
	private isStart: boolean = false;
    public start() {
        this.org = this.moveSpeed;
        this.camera = this.getComponent(Camera);
        this.player = this.realPlayer.getComponent(Transform);
        EventUtility.Regist(EventNames.onPlayerDead, () => {
            this.moveSpeed = 0;
        });
        StartUtility.OnClear(() => {
            this.moveSpeed = this.org;
			SoundUtility.Stop(SoundId.dead_TimeOut);
		});
	}
	public Init() {
		this.camera.Position = this.player.Position.add(this.offset);
		this.isFired = false;
	}
	public Run() {
		this.isStart = true;
	}
	public Stop() {
		this.isStart = false;
    }
    lateUpdate() {
        if (this.isStart) {
            this._follow();
        }
	}
	public ApplyPos(pos: cc.Vec2) {
		this.camera.Position = pos.add(this.offset);
    }

	private _follow() {
		let uiCamPos = GameCoordinate.TransformDir(this.camera.Position);
		let uiPlayerPos = GameCoordinate.TransformDir(this.player.Position.add(this.offset));
		let uiDir = uiPlayerPos.sub(uiCamPos);

		if (uiPlayerPos.y != uiCamPos.y)
			uiCamPos.y += uiDir.y * this.flowSpeed;
		if (uiPlayerPos.x > uiCamPos.x)
			uiCamPos.x += uiDir.x * this.flowSpeed;
		if (uiPlayerPos.x + this.deadLine < uiCamPos.x && !this.isFired) {
			//EventUtility.Fire(EventNames.onPlayerDead);
			this.realPlayer.Dead();
			SoundUtility.Play(SoundId.dead_TimeOut);
			this.isFired = true;
		}
		uiCamPos.x += this.moveSpeed;
        this.camera.Position = GameCoordinate.InverseTransformDir(uiCamPos);
	}
}
