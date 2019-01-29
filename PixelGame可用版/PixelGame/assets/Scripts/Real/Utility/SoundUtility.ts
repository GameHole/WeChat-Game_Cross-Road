import EventNames from "../EventNames";
import EventUtility from "./EventUtility";
import ISoundPlayer from "../Sounds/ISoundPlayer";
import WxAudioPlayer from "../Sounds/WxAudioPlayer";

export default class SoundUtility {
    private static _player: ISoundPlayer;
    public static Previde(player: ISoundPlayer) {
        this._player = player;
    }
    public static Play(id, loop = false, v: number = 1): WxAudioPlayer {
		return this._player.Play(id, loop, v);
	}
	public static New(id: number) {
		return this._player.New(id);
	}
    public static Stop(id) {
        this._player.Stop(id);
    }
}
