import Wx from "../WXAPI/wx";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WxAudioPlayer extends cc.Component {
    private static isMule: boolean = false;
    private audio = null;
    public get AutoPlay() { return this.audio.autoplay; }
    public set AutoPlay(b) { if (this.audio != null) this.audio.autoplay = b; }
    public get loop() { return this.audio.loop; }
    public set loop(loop) { if (this.audio != null) this.audio.loop = loop; }
    public set clip(c: cc.AudioClip) {
        if (this.audio != null)
            this.audio.src = c;
        //console.log("this.audio.src " + this.audio.src);
    }
    public get clip() { return this.audio.src; }
    private _volume: number = 1;
    public get volume() { return this._volume; }
    public set volume(v) {
        this._volume = v;
        this.setv();
    }
    public get duration() { return this.audio.duration; }
    public get currentTime() { return this.audio.currentTime; }
    private _isPlaying: boolean = false;
    private isContinue: boolean = false;
    public get isPlaying() { return this._isPlaying; }
    public Init(): WxAudioPlayer {
        let self = this;
        Wx.SafeCall((wx) => {
            self.audio = wx.createInnerAudioContext();
            self.audio.onPlay(function () {
                self._isPlaying = true;
                //console.log("playing",e);
            });
            self.audio.onStop(function () {
                self._isPlaying = false;
                //console.log("stop",e);
            });
            self.audio.onPause(function () {
                self._isPlaying = false;
                //console.log("onPause",e);
            });
            self.audio.onEnded(function () {
                self._isPlaying = false;
                //console.log("end",e);
            });

        });
        Wx.SafeCall((wx) => {
            wx.onShow(function () {
                self.replay();
                //console.error("onShow onplay");
            });
            wx.onAudioInterruptionEnd(function () {
                self.replay();
                //console.error("onAudioInterruptionEnd onplay");
            });
        });
        EventUtility.Regist(EventNames.onMule, (mule) => {
            WxAudioPlayer.isMule = !mule;
            //console.log("WxAudioPlayer.isMule " + WxAudioPlayer.isMule);
            this.setv();
        })
        return this;
    }
    private replay() {
        if (this.isContinue)
            if (this.audio != null)
                this.audio.play();
    }
    public Play() {
        if (this.audio != null) {
            //console.log("Play  volume " + this.audio.volume);
            this.isContinue = this.loop;
            this.audio.play();
        }
    }
    public Stop() {
        if (this.audio != null) {
            this.isContinue = false;
            this.audio.stop();
        }
    }
    onDestroy() {
        if (this.audio != null)
            this.audio.destroy();
    }
    private setv() {
        if (WxAudioPlayer.isMule == true) {
            if (this.audio != null)
                this.audio.volume = 0;
        }
        else {
            if (this.audio != null)
                this.audio.volume = this._volume;
        }
        //console.log("audio.volume " + this.audio.volume);
    }
}
