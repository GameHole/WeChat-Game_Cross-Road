import Number from "../Number";
import EventUtility from "../Utility/EventUtility";
import OnForward from "../Scores/OnForward";
import EventNames from "../EventNames";
import GiftRecever from "./GiftRecever";
import SaveUtility from "../Utility/SaveUtility";
import DateUtility from "../Utility/DateUtility";
import CloudUtility from "../Utility/CloudUtility";

const { ccclass, property } = cc._decorator;
class config {
	public step: number;
	public gold: number;
	public constructor(step: number, gold: number) {
		this.step = step;
		this.gold = gold;
	}
}
@ccclass
export default class Gift extends cc.Component {
	private readonly configs = [
		new config(100, 5),
		new config(300, 10),
		new config(500, 15),
		new config(1000, 25),
		new config(1500, 35),
		new config(2000, 50)
	];
	private static currrent: number = 0;
	private level: number = 0;
    private button: cc.Button;
    private first: boolean = false;
	@property(Number)
	lift: Number = null;
	@property(Number)
	right: Number = null;
	@property(GiftRecever)
	revever: GiftRecever = null;
	@property(cc.Node)
    remind: cc.Node = null;
    @property(cc.Node)
    remindBuoble: cc.Node = null;
    public static Sub(value: number): void {
        this.currrent -= value;
        if (this.currrent < 0)
            this.currrent = 0;
    }
    public static Save() {
        SaveUtility.SetItem("Step", Gift.currrent);
        CloudUtility.UpdateServer("Step");
    }
	onLoad() {
		//this.checkReset();
		//Gift.currrent = SaveUtility.GetItem("Step");
  //      this.level = SaveUtility.GetItem("GiftLevel");
  //      this.first = SaveUtility.GetItem("FirstTakeRecv") == 0;
	}
	private checkReset() {
        if (DateUtility.isDateChange()) {
			SaveUtility.SetItem("Step", 0);
			CloudUtility.UpdateServer("Step")
			SaveUtility.SetItem("GiftLevel", 0);
			CloudUtility.UpdateServer("GiftLevel")
			SaveUtility.SetItem("FirstTakeRecv", 0);
			CloudUtility.UpdateServer("FirstTakeRecv")
        }
	}
	start() {

        this.checkReset();
        this.level = SaveUtility.SafeGetNum("GiftLevel");
        //console.log("level", this.level);
        this.first = SaveUtility.SafeGetNum("FirstTakeRecv") == 0;
		Gift.currrent = SaveUtility.SafeGetNum("Step");
		

		this.button = this.getComponent(cc.Button);
		let eh = new cc.Component.EventHandler();
		eh.target = this.node;
		eh.component = "Gift";
		eh.handler = "OpenGift";
		this.button.clickEvents.push(eh);
		EventUtility.Regist(EventNames.onForward, (x) => {
			Gift.currrent += x;
			//SaveUtility.SetItem("Step", Gift.currrent);
			//console.log(Gift.currrent);
		});
	}
	public OpenGift() {
        this.revever.open(this.curConfg().gold, () => {
            this.addLevel();
        });
	}
    public addLevel() {
        Gift.Sub(this.configs[this.level].step);
		this.level++;
		if (this.level >= this.configs.length)
			this.level = this.configs.length - 1;
        SaveUtility.SetItem("GiftLevel", this.level);
        if (this.first) {
            SaveUtility.SetItem("FirstTakeRecv", 1);
            this.first = false;
        }
	}
	public curConfg(): config {
		return this.configs[this.level];
	}
	private show() {
		//console.log("level",this.level);
		let con = this.configs[this.level];
		if (Gift.currrent < con.step) {
			this.lift.SetNumber(Gift.currrent);
			this.button.enabled = false;
            this.remindBuoble.active = this.remind.active = false;
		} else {
			this.lift.SetNumber(con.step);
            this.button.enabled = true;
            this.remind.active = true;
            this.remindBuoble.active = this.first;
		}
		this.right.SetNumber(con.step);
	}
	update() {
		this.show();
	}
}
