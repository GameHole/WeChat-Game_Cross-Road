import SoundUtility from "../Utility/SoundUtility";
import SoundId from "./SoundId";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonSound extends cc.Component {
	private btn: cc.Button;
	start() {
		this.btn = this.getComponent(cc.Button);
		let x = new cc.Component.EventHandler();
		x.target = this.node;
		x.component = "ButtonSound";
		x.handler = "onClick";
		let e = this.btn.clickEvents.pop();
		this.btn.clickEvents.push(x);
		this.btn.clickEvents.push(e);
		//console.log("regist");
	}
	public onClick() {
		SoundUtility.Play(SoundId.ClickImg);
		//console.log("click");
	}
}
