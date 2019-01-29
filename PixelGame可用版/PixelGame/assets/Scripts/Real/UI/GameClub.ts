import Wx from "../WXAPI/wx";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameClub extends cc.Component {
	buton: any;
	@property(cc.Node)
	buttonData: cc.Node = null;
	@property(cc.Canvas)
	canvas: cc.Canvas = null;
	start() {
		EventUtility.Regist(EventNames.onGameStart, () => {
			this.hide();
		});
		EventUtility.Regist(EventNames.onReturnMenu, () => {
			this.show();
		});
		let self = this;
		Wx.SafeCall((wx) => {
			let scalex;
			let scaley;
			wx.getSystemInfo({
				success: function (res) {
					scalex = res.windowWidth / self.canvas.designResolution.width;
					scaley = res.windowHeight / self.canvas.designResolution.height;
				}
			})
			let z = {
				icon: 'green',
				style: {
					left: (this.buttonData.x + this.canvas.designResolution.width / 2 - this.buttonData.width/2) * scalex,
					top: (this.canvas.designResolution.height / 2 - this.buttonData.y - this.buttonData.height / 2) * scaley,
					width: this.buttonData.width * scalex,
					height: this.buttonData.height * scaley
				}
			}
			console.log(z);
			this.buton = wx.createGameClubButton(z);
			this.buton.onTap((e) => {
				console.log(e);
			});
		});
	}
	show() {
		if (this.buton) {
			this.buton.show();
		}
	}
	hide() {
		if (this.buton) {
			this.buton.hide();
		}
	}
	onDestroy() {
		if (this.buton) {
			this.buton.destroy();
		}
	}
	
}
