import ISoundPlayer from "./ISoundPlayer";
import SoundUtility from "../Utility/SoundUtility";
import WxAudioPlayer from "./WxAudioPlayer";
import SoundId from "./SoundId";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
const { ccclass, property } = cc._decorator;
@ccclass
export default class Sound extends cc.Component implements ISoundPlayer {
    New(id: number): WxAudioPlayer {
        let souce = this.addComponent(WxAudioPlayer).Init();
		souce.clip = this.clips[id];
		return souce;
    }
    @property(cc.AudioClip)
    clips: Array<cc.AudioClip> = new Array<cc.AudioClip>();
	private players = new Array<Array<WxAudioPlayer>>();
	onLoad() {
		SoundUtility.Previde(this);
        for (var i = 0; i < SoundId.BGM; i++) {
            this.takeUnused(i, 1);
        }
    }
    private takeUnused(id: number v: number = 1): any{
		if (this.players[id] == null)
			this.players[id] = new Array<WxAudioPlayer>();
		//console.log(this.players[id].length);
		for (var i = 0; i < this.players[id].length; i++) {
			if (this.players[id][i].isPlaying == false) {
                return this.players[id][i];
			}
		}
        let xx = this.addComponent(WxAudioPlayer).Init();
        xx.clip = this.clips[id];
        xx.volume = v;
        this.players[id].push(xx);
        return xx;
    }
    Play(id: number, loop: boolean, v: number = 1): WxAudioPlayer {
        let un = this.takeUnused(id, v);
        un.loop = loop;
        un.Play();
        return un;
    }
	Stop(id: number) {
		let ar = this.players[id];
		if (ar == null) return;
		for (var i = 0; i < ar.length; i++) {
			ar[i].Stop();
		}
	}
}
