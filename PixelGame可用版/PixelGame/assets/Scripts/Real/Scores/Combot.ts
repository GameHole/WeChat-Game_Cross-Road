import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import StartUtility from "../Utility/StartUtility";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Combot extends cc.Component {
	private add = 0;
	@property()
    public time = 2;
    private openCount = 5;
    private openRun = 0;
    private level = 0;
	start() {
		StartUtility.Start(() => {
			this.level = 0;
			this.openRun = 0;
		});
		EventUtility.Regist(EventNames.onForward, (s) => {
			if (this.add <= this.time) {
				this.openRun++;
				if (this.openRun >= this.openCount) {
					this.level++;
					if (this.level > 3)
						this.level = 3;
					else
						SoundUtility.Play(SoundId.Combot);
					this.openRun = 0;
				}
				EventUtility.Fire(EventNames.onCombot, this.level);
			}
			this.add = 0;
		});
	}
    public get Level() {
        return this.level;
    }
    public get CombotScore() {
        switch (this.level) {
            default:
                return 0;
            case 1:
                return 3;
            case 2:
                return 5;
            case 3:
                return 10;
        }
    }
    update(dt) {
        this.add += dt;
        if (this.add >= this.time) {
            this.openRun = 0;
            this.level = 0;
            EventUtility.Fire(EventNames.onCombot, this.level);
        }
        // console.log("openRun::" + this.openRun + "     level::" + this.level);
    }
}
