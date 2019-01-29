import PlayerUIs from "../PlayerUIs";
import PlayerSprites from "../PlayerSprites";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import MoveTo from "../MoveTo";
import MathUtility from "../Utility/MathUtility";
import UIMoveto from "./UIMoveto";
import ScaleTo from "./ScaleTo";
import Toucher from "../Toucher";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import SaveUtility from "../Utility/SaveUtility";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RoleSelector extends cc.Component {
    public playerUI: PlayerUIs;
    public runsH: Array<cc.Node>;
    public runsV: Array<cc.Node>;
	@property()
	xSpace: number = 200;
	@property()
	ySpace: number = 180;
	@property()
    yOffset: number = 50;
    @property()
    normalScale = 0.8;
    @property()
    selectedScale = 1.2;
	public currentX: number = 0;
    public currentY: number = 0;
    public get currentSprite(): PlayerSprites {
        return this.playerUI.Take(this.currentX, this.currentY);
	}
	private readLastSelect() {
		let last = SaveUtility.GetItem("LastSelect");
		if (last != null) {
			//console.log(last.x);
			this.currentX = last.x;
			this.currentY = last.y;
		}
	}
	public saveLastSelect(xy: cc.Vec2) {
		SaveUtility.SetItem("LastSelect", { x: xy.x, y: xy.y });
	}
	start() {
		this.readLastSelect();
        this.playerUI = cc.find("PlayeUIs").getComponent(PlayerUIs);
        this.runsH = new Array<cc.Node>(this.playerUI.RoleLength);
        for (let i = 0; i < this.runsH.length; i++) {
            this.runsH[i] = this.AddASprite().node;
            this.runsH[i].parent = this.node;
        }
        this.runsV = new Array<cc.Node>(3);
        for (let i = 1; i < this.runsV.length; i++) {
            this.runsV[i] = this.AddASprite().node;
            this.runsV[i].parent = this.node;
        }
		this.moveToH();
		this.moveToV();
		//console.log("onload");
        EventUtility.Regist(EventNames.onToucherMove, (move: cc.Vec2, sender: Toucher) => {
			if (this.Runing()) return;
			let over = false;
            if (Math.abs(move.x) > sender.deadLine) {
				let res = this.safeAdd(this.currentX, this.runsH.length, -Math.sign(move.x));
				this.currentX = res.x;
				over = over || res.o;
                this.currentY = 0;
                this.moveToH();
				this.moveToV();
				
			}
			else if (Math.abs(move.y) > sender.deadLine) {
				let res = this.safeAdd(this.currentY, 3, Math.sign(move.y));
				this.currentY = res.x;
				over = over || res.o;
                this.moveToV();
			}
			if (over) return;
			SoundUtility.Play(SoundId.SelectRole);
			EventUtility.Fire(EventNames.onRoleChange, this.currentX/*, this.currentY*/);
        })
	}
    private safeAdd(x: number, max: number, value: number) {
		x += value;
		let over = false;
		if (x >= max) {
			x = max - 1;
			over = true;
		}
		else if (x < 0) {
			over = true;
			x = 0;
		}
		return { x: x, o: over };
    }
    private AddASprite(): cc.Sprite {
        return new cc.Node().addComponent(UIMoveto).addComponent(ScaleTo).addComponent(cc.Sprite);
	}
    private moveToH() {
        for (let i = 0; i < this.runsH.length; i++) {
            let moveTo = this.runsH[i].getComponent(UIMoveto);
            let scaleTo = this.runsH[i].getComponent(ScaleTo);
            scaleTo.speed = moveTo.speed = 8.5;
            let y = 0;
            let scale = this.normalScale;
            let sp = this.playerUI.Take(i, 0).back;
            if (i == this.currentX) {
                y = this.yOffset;
                scale = this.selectedScale;
                sp = this.playerUI.Take(i, 0).right;
            }
            this.runsH[i].getComponent(cc.Sprite).spriteFrame = sp;
            moveTo.Run(this.runsH[i].position, new cc.Vec2((i - this.currentX) * this.xSpace, y));
            scaleTo.Run(this.runsH[i].scale, scale);
        }
    }
    private moveToV() {
		this.runsV[0] = this.runsH[this.currentX];
        for (let i = 0; i < this.runsV.length; i++) {
            let moveTo = this.runsV[i].getComponent(UIMoveto);
            let scaleTo = this.runsV[i].getComponent(ScaleTo);
            scaleTo.speed = moveTo.speed = 8.5;
            let scale = this.normalScale;
            let spcol = this.playerUI.Take(this.currentX, i);
            let sp = spcol.back;
            if (i == this.currentY) {
                scale = this.selectedScale;
                sp = spcol.right;
            }
            this.runsV[i].getComponent(cc.Sprite).spriteFrame = sp;
            moveTo.Run(this.runsV[i].position, new cc.Vec2(0, (this.currentY - i) * this.ySpace + this.yOffset));
            scaleTo.Run(this.runsV[i].scale, scale);
        }
    }
    public Runing() {
        for (let i = 0; i < this.runsH.length; i++) {
            if (this.runsH[i].getComponent(UIMoveto).IsRun) {
                return true;
            }
        }
        for (let i = 0; i < this.runsV.length; i++) {
            if (this.runsV[i].getComponent(UIMoveto).IsRun) {
                return true;
            }
        }
        return false;
    }
}
