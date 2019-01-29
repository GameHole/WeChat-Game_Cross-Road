
export default class SaveUtility{
	public static GetItem(key: string) {
		let v = cc.sys.localStorage.getItem(key);
		//console.log(v == "");
		if (v == "") return null;
		
		return JSON.parse(v);
	}
	public static SetItem(key: string, value) {
		cc.sys.localStorage.setItem(key, JSON.stringify(value));
	}
	public static Remove(key: string) {
		cc.sys.localStorage.removeItem(key);
	}
}
