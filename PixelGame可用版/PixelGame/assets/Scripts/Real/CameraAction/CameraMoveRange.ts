import UIMap from "../UIMap";
import FollowPlayer from "./FollowPlayer";
import Camera from "../Camera";
import GameCoordinate from "../GameCoordinate";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import StartUtility from "../Utility/StartUtility";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraMoveRange extends cc.Component {
	@property(UIMap)
	uimap: UIMap = null;
	private follow: FollowPlayer = null;
    private camera: Camera;
    private isDead = false;
    start() {
        this.follow = this.getComponent(FollowPlayer);
        this.camera = this.getComponent(Camera);
		EventUtility.Regist(EventNames.onPlayerDead, () => {
			this.isDead = true;
			
		});
		StartUtility.OnClear(() => {
			this.isDead = false;
		});
    }

    update(dt) {
        if (this.isDead) {
            let gameY = GameCoordinate.TransformDir(this.camera.Position).y;
            let len = GameCoordinate.Size.mag() / 2;
            let miny = (this.uimap.sideSizeDown + 2.5) * len;
            let maxy = (this.uimap.sideSizeDown + this.uimap.width+2.5) * len;
            if (gameY > maxy || gameY < miny)
				this.follow.Stop();
        }

        // console.log("camy::" + gameY + "  miny::" + miny + "  maxy::" + maxy + "  len::" + len);
    }
}
