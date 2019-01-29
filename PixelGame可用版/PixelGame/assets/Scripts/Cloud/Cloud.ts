import Wx from "../Real/WXAPI/wx";
import SaveUtility from "../Real/Utility/SaveUtility";
import EventUtility from "../Real/Utility/EventUtility";
import EventNames from "../Real/EventNames";
import ColorTo from "../Real/RoleSelector/ColorTo";
const {ccclass, property} = cc._decorator;
@ccclass
export default class Cloud extends cc.Component {
	private readonly dirtyData = "dirtyData";
	private isConnected = false;
	async start() {
		cc.game.addPersistRootNode(this.node);
		EventUtility.Regist(EventNames.updateServer, async (k: string) => {
			this.isConnected = await this.checkNetConnection();
			if (!this.isConnected) {
				this.setDirtyData(true);
				return;
			}
			try {
				this.updateValue(k)//.then().catch(e => { this.updateValue(k) });
			} catch (e) {
				console.log("err::", k);
			}
		   
		});
		//await this.preload("1");
		cc.director.preloadScene("1", async () => {
			await this.InitDatas();
			this.loadGameScene();
		});
	}
	private preload(name: string): Promise<any>{
		let p = new Promise(function (resolve, reject) {
			cc.director.preloadScene(name, resolve);
		});
		return p;
	}
	private loadGameScene() {
		cc.director.loadScene("1");
		console.log("loadGameScene");
	}
	private HasDirtyData(): boolean {
		let dr = SaveUtility.GetItem(this.dirtyData);
		return dr != null && dr == true;
	}

	private setDirtyData(data: boolean) {
		cc.sys.localStorage.setItem(this.dirtyData, JSON.stringify(data));
	}
	private async InitDatas() {
		this.isConnected = await this.checkNetConnection();
		if (this.isConnected) {
			if (!this.HasDirtyData()) {
				await this.updateLocal();
			} else {
				await this.updateServer();
				this.setDirtyData(false);
			}
		}
		else
			this.handleDisconnected();
	}
	
	private async updateLocal() {
		let jsonData = await this.takeDatas();
		//console.log("json", jsonData);
		if (jsonData != null)
			this.UpdateLocalData(jsonData);
	}
	private UpdateLocalData(json) {
		this.SaveData("MaxScore", json);
		this.SaveData("coin", json);
		this.SaveData("useableRoles", json);
		this.SaveData("LastDate", json);
		this.SaveData("Step", json);
		this.SaveData("GiftLevel", json);
		this.SaveData("FirstTakeRecv", json);
	}
	private SaveData(key: string, json) {
		let v = json[key];
		if (v == null) return;
		SaveUtility.SetItem(key, v);
		//console.log("save key::" + key + " value::" + v);
	}
	private takeDatas(): Promise<any> {
		let p = new Promise(function (resolve, reject) {
			Wx.SafeCall(async (wx) => {
				wx.cloud.init();
				wx.cloud.callFunction({
					name: 'getUserData'
				}).then(res => {
					console.log("getUserData", res);
					if (res.result.length == 0)
						resolve(null)
					else
						resolve(res.result[0]);
				}).catch(reject);
			})
		});
		return p;
		
	}
	private handleDisconnected() {
		console.log("disconnected");
	}
	private checkNetConnection(): Promise<boolean> {
		var p = new Promise<boolean>(function (resolve, reject) {
			Wx.SafeCall((wx) => {
				wx.getNetworkType({
					success: function (res) {
						resolve(res.networkType != "none");
					},
					fail: function (res) {
						reject(res);
					}
				})
			});
		});
		return p;
	}
	private async updateServer() {
		await this.updateValue("score");
		await this.updateValue("coin");
		await this.updateValue("useableRoles");
	}
	private updateValue(_key: string): Promise<any> {
		let v = SaveUtility.GetItem(_key);
		if (v == null) return;
		let p = new Promise<any>(function (resolve, reject) {
			Wx.SafeCall((wx) => {
				wx.cloud.init();
				wx.cloud.callFunction({
					name: 'setData',
					data: {
						"key": _key,
						"value": v
					}
				}).then(resolve).catch(reject);
			});
		});
	}
}
