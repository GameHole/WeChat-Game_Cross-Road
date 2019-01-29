import UIScalor from "../Real/UIScalor";
import Random from "../Real/Random";
import Car from "../Real/Car";
import CarGenor from "../Real/CarGenor";
import ValueTwinkler from "../Real/ValueTwinkler";
import Stack from "../System/Stack";
import RefArray from "../Real/RefArray";
import List from "../System/List";
import MathUtility from "../Real/Utility/MathUtility";
import Transform from "../Transform/Transform";
import ColorTo from "../Real/RoleSelector/ColorTo";
import ReferSelf from "../Real/ReferSelf";
import ImageEffect from "../Real/ImageEffect";
import Wx from "../Real/WXAPI/wx";
import SaveUtility from "../Real/Utility/SaveUtility";
//import PoolUtility from "../Real/Utility/PoolUtility";
//import DestroySelf from "./DestroySelf";
class RoleData {
    public roleType;
    public roleSkin;
}
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
	private tran: Transform;
	private frame: number = 0;
	private refarray: RefArray = new RefArray();
	@property(cc.Node)
	refs = Array<cc.Node>();
	start() {
		//let ca = this.getComponent(cc.Canvas);
		//Wx.SafeCall((wx) => {
		//	let scalex;
		//	let scaley;
		//	wx.getSystemInfo({
		//		success: function (res) {
		//			scalex = res.windowWidth / ca.designResolution.width;
		//			scaley = res.windowHeight / ca.designResolution.height;
		//			//px2rpx = 750 / windowWidth;
		//		}
		//	})
		//	let z = {
		//		icon: 'green',
		//		style: {
		//			left: 10 * scalex,
		//			top: 10 * scaley,
		//			width: 40 * scalex,
		//			height: 40 * scaley
		//		}
		//	}
		//	console.log(z);
		//	let buton = wx.createGameClubButton(z);
		//	buton.onTap((e) => {
		//		console.log(e);
		//	});
		//});
        //console.log(cc.winSize);
        Wx.SafeCall((wx) => {
            wx.onShow(() => {
                console.log("AAAAA");
                this.getInfo();
            })
        });
        //this.getInfo();
	}
	public test() {
		let x = this.getComponent(ColorTo);
		x.Run(0, 255, null, () => {
			x.Run(255, 0);
		});
	}
    update(dt) {
        //this.refarray.foreach((item) => {
        //	console.log(item.node.name);
        //});
        //this.getInfo();
    }
    getInfo() {
        Wx.SafeCall(async (wx) => {
                var obj = await wx.getLaunchOptionsSync();
                console.log("res=", obj);
        });
    }
    public click() {
        Wx.SafeCall((wx) => {
            wx.shareAppMessage
                ({
                    title: "我需要你的帮助,赶紧一起来玩彩虹军团吧~",      //分享标题
                    //imageUrl: shareImgUrl,
                    query: "nick=" + "aaa" + "&gender=" + "bbb" + "&city=" + "ccc", // 别人点击链接时会得到的数据
                    success(res) {
                        console.log(res)
                    },
                    fail(res) {
                        console.log(res)
                    } 
                });
        });
    }
	//lateUpdate() {
	//	console.log(this.node.name + "::lateupdate");
	//}
}
