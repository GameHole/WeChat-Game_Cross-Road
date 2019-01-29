import Stack from "../../System/Stack";

//class NodePool {
//    private _array = new Array<cc.Node>();
//    public get length() { return this._array.length; }
//    public Put(node: cc.Node) {
//        if (node == null) {
//            throw "!!!!!!!!!!!!!!!!!!!!Please not Put A None";
//        }
//        node.active = false;
//		node.removeFromParent();
//		cc.game.addPersistRootNode(node);
//        this._array.push(node);
//    }
//    public Get(): cc.Node {
//        let node = this._array.pop();
//        node.active = true;
//        cc.game.removePersistRootNode(node);
//        return node;
//    }
//}
class StackNodePool {
    private _array = new Stack<cc.Node>();
    public get length() { return this._array.Count; }
    public Put(node: cc.Node) {
        if (node == null) {
            throw "!!!!!!!!!!!!!!!!!!!!Please not Put A None";
        }
        node.active = false;
        //node.removeFromParent(false);
        //cc.game.addPersistRootNode(node);
        this._array.Push(node);
    }
    public Get(): cc.Node {
        let node = this._array.Pop();
        node.active = true;
        //cc.game.removePersistRootNode(node);
        return node;
    }
}
export default class PoolUtility {
    //private static _pools: Array<NodePool> = Array<NodePool>();
    private static _pools: Array<StackNodePool> = Array<StackNodePool>();
    public static Instance(prefab: cc.Prefab): cc.Node {
        let pool = this._pools[prefab.data.name];
		if (pool == null || pool.length <= 0) {
			//console.log("new::" + prefab.data.name);
			return cc.instantiate(prefab);
		}
		//console.log(" reuse::" + prefab.data.name);
        return pool.Get();
    }
    public static Destroy(node: cc.Node) {
        //console.log("destroy::" + node.name);
        let pool = this._pools[node.name];
        if (pool == null)
            //pool = this._pools[node.name] = new NodePool();
            pool = this._pools[node.name] = new StackNodePool();
        pool.Put(node);
    }
    public static debug() {
        this._pools.forEach((e) => { console.log(e.length); });
    }

    public static getorAddComponent<T extends cc.Component>(type: { new(): T }, node): T {
        let cmp = node.getComponent(type);
        if (cmp == null)
            cmp = node.addComponent(type);
        return cmp;
    }
}
