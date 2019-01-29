import GameMgr from "../GameMgr";
import SceneUtility from "../Utility/SceneUtility";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DeadUI extends cc.Component {
	public Restart() {
		SceneUtility.LoadScene();
    }
    public Retuen() {
        GameMgr.RetuenStart();
    }
}
