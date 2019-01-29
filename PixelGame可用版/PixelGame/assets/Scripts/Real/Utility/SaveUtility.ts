
export default class SaveUtility{
	public static GetItem(key: string) {
		let v = cc.sys.localStorage.getItem(key);
		if (v == "") return null;
		return JSON.parse(v);
	}
	public static SetItem(key: string, value) {
		cc.sys.localStorage.setItem(key, JSON.stringify(value));
	}
	public static Remove(key: string) {
		cc.sys.localStorage.removeItem(key);
	}
	public static SafeGetNum(key: string): number {
        let z = SaveUtility.GetItem(key);
        //console.log(key, z);
		if (z == null) return 0;
		return z;
	}
}
