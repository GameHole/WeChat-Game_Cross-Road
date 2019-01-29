import PlayerSprites from "./PlayerSprites";
const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerUIs extends cc.Component {
    @property(PlayerSprites)
    sprites:Array<PlayerSprites> = new Array<PlayerSprites>();
	public static curent: PlayerSprites;
	private static _curID: number = 0;
	public static get curRoleID(): number { return this._curID; }
	public Take(x: number, y: number): PlayerSprites{
		return this.sprites[x*3+y];
    }
    public get RoleLength() { return this.sprites.length / 3 };
    public get length() {
        return this.sprites.length; 
    }
    public SetCurrent(x, y): void {
        PlayerUIs.curent = this.Take(x, y);
        PlayerUIs._curID = x;
    }
    public SetByIndex(index): void {
        PlayerUIs.curent = this.sprites[index];
        PlayerUIs._curID = Math.floor(index / 3);
    }
    //onLoad() {
    //    PlayerUIs.curent = this.sprites[this.default];
    //    // this.sprites = this.Load();
    //    // this.SetCurrent(0, 0);
    //}
    // @property()
    // roleCount: number = 4
    // @property()
    // skinCount = 3;
    // public SetCurrent(roleNum, skinNum) {
    //     PlayerUIs.curent = this.sprites[roleNum * this.roleCount + skinNum];
    // }
    // public Load(): Array<PlayerSprites> {
    //     let array = new Array<PlayerSprites>();
    //     for (let i = 0; i < this.roleCount; i++) {
    //         cc.loader.loadResDir("Textures/role/role" + i, cc.SpriteFrame, (err, resArray) => {
    //             if (err != null) {
    //                 throw err;
    //             }
    //             console.log(resArray.length);
    //             for (let i = 0; i < resArray.length; i += 6) {
    //                 let psp = new PlayerSprites();
    //                 psp.back = resArray[i];
    //                 psp.forward = resArray[i + 1];
    //                 psp.left = resArray[i + 2];
    //                 psp.right = resArray[i + 3];
    //                 psp.deadFlow = resArray[i + 4];
    //                 psp.deadGround = resArray[i + 5];
    //                 array.push(psp);
    //                 console.log(psp.back.name);
    //             }
    //         });
    //     }
    //     return array;
    // }
}
