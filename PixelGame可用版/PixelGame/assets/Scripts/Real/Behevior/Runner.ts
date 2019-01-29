import Root from "./Root";
import UIMap from "../UIMap";
import ResouseData from "../Res/ResouseData";
import Selector from "./Selector";
import IsType from "./Conditions/IsType";
import RandomSelector from "./RandomSelector";
import AddBitch from "./Actions/AddBitch";
import AddSoil from "./Actions/AddSoil";
import AddRiver from "./Actions/AddRiver";
import AddWalk from "./Actions/AddWalk";
import AddRoad from "./Actions/AddRoad";
import AddGrass from "./Actions/AddGrass";
import ChangRaodSprite from "./Actions/ChangRaodSprite";
import Mirror from "./Actions/Mirror";
import RealPlayer from "../RealPlayer";
import AddHightWay from "./Actions/AddHightWay";
import SimpleRandom from "./Conditions/SimpleRandom";
import RemoveObs from "./Actions/RemoveObs";
import AddRanCar from "./Actions/AddRanCar";
import OrSelector from "./OrSelector";
import GameMgr from "../GameMgr";
import GenItem from "./Actions/GenItem";
import Tags from "../TriggerDealers/Tags";
import IsNotType from "./Conditions/IsNotType";
import Sequence from "./Sequence";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import InputHandler from "../InputHandler";
import AddTraffic from "./Actions/AddTraffic";
import GameCoordinate from "../GameCoordinate";
import OnForward from "../Scores/OnForward";
import StartUtility from "../Utility/StartUtility";
import Transform from "../../Transform/Transform";
import Camera from "../Camera";
import FollowPlayer from "../CameraAction/FollowPlayer";
import ABeheviorTree from "./ABeheviorTree";
import Random from "../Random";
import SaveUtility from "../Utility/SaveUtility";
import Nav from "../UI/Nav";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Runner extends cc.Component {
    @property(Nav)
    nav: Nav = null;
	@property(UIMap)
	uimap: UIMap = null;
	@property(RealPlayer)
	player: RealPlayer = null;
    @property(ResouseData)
	arrayData = [];
	private dict: Array<ABeheviorTree> = new Array<ABeheviorTree>();
	private itemGen: ABeheviorTree = null;
    //private reuser: Reuser;
    private MapStart = this.NormalStart;
	start() {
		//this.reuser = this.addComponent(Reuser);
		this.offset = Math.floor(this.offset * 1.0 / GameCoordinate.scale);
        this.player._init();
        this.nav.node.active = false;
		StartUtility.Start(() => {
            this._InitSelf();
			this._InitPos();
			this._InitMap();
		});
    }
    private _InitSelf() {
        if (GameMgr.isStarted) {
            let first = SaveUtility.GetItem("firstInGame");
            if (first == null) {
                this.MapStart = this.AddNav;
                this.nav.node.active = true;
                SaveUtility.SetItem("firstInGame", 1);
            } else {
                this.nav.node.active = false;
                this.MapStart = this.NormalStart;
            }
        }
    }
	private _InitMap() {
		let road = new Sequence();
		road.Add(new AddRoad());
		road.Add(new AddRanCar());
		if (GameMgr.isStarted) {
			let sel = new Selector();
			sel.Add(new SimpleRandom(50));
			sel.Add(new GenItem(Tags.Coin));
			road.Add(sel);
		}
		let grass = new AddGrass();
		let walk = new AddWalk();
		let bitch = new AddBitch();
		let soil = new AddSoil();
		let river = new Sequence();
		river.Add(new RemoveObs());
		river.Add(new AddRiver());
		let highway = new AddHightWay();
		let traffic = new Sequence();
		traffic.Add(new RemoveObs());
		traffic.Add(new AddTraffic());

		//road
		let ranRoad = new RandomSelector();
		let node1 = new Selector();
		node1.Add(road);
		node1.Add(new ChangRaodSprite(1))
		ranRoad.Add(node1);

		let node2 = new Selector();
		let or0 = new OrSelector();
		let localLocal0 = new Selector();
		localLocal0.Add(new IsType("Walk", 2));
		localLocal0.Add(new ChangRaodSprite(2));
        let localLocal1 = new ChangRaodSprite(3)//new Selector();
		//localLocal1.Add(new ChangRaodSprite(0))
		//localLocal1.Add(new Mirror());
		or0.Add(localLocal0);
		or0.Add(localLocal1);
		node2.Add(or0);
		node2.Add(walk);
		ranRoad.Add(node2);
		//Grass
		let ranGrass = new RandomSelector();
		ranGrass.Add(walk);
		ranGrass.Add(soil);
		let riversel = new Selector();
		riversel.Add(new SimpleRandom(5));
		riversel.Add(river);
		ranGrass.Add(riversel);
		let bichsel = new Selector();
		bichsel.Add(new SimpleRandom(5));
		bichsel.Add(bitch);
		ranGrass.Add(bichsel);
		//Walk
		let ranWalk = new RandomSelector();
		ranWalk.Add(road);
		// ranWalk.Add(river);
		let hisel = new Selector();
        hisel.Add(new SimpleRandom(1));
        hisel.Add(new RemoveObs());
		hisel.Add(highway);
		ranWalk.Add(hisel);

		let trasel = new Selector();
		trasel.Add(new SimpleRandom(3));
		trasel.Add(traffic);
		ranWalk.Add(trasel);

		let wsel = new Selector();
		wsel.Add(new IsType("Road", 2));
		let walran = new RandomSelector();
		walran.Add(grass);
		walran.Add(soil);
		wsel.Add(walran);
		ranWalk.Add(wsel);
		//Bitch
		let ranBitch = grass;
		//Soil
		let ranSoil = new RandomSelector();
		ranSoil.Add(soil);
		ranSoil.Add(grass);
		ranSoil.Add(walk);
		//River
		let ranRiver = new Sequence();
		let localran = new RandomSelector();
		localran.Add(walk);
		localran.Add(grass);
		ranRiver.Add(localran);
		ranRiver.Add(new RemoveObs());
		//HightWay
        let ranHightWay = new Sequence();
        ranHightWay.Add(walk);
        ranHightWay.Add(new RemoveObs());

		//Traffic
		let ranTraffic = new Sequence();
		ranTraffic.Add(walk);
		ranTraffic.Add(new RemoveObs());
		//over

		let sq = new Sequence();
		if (GameMgr.isStarted) {
			let itemRan = new RandomSelector();
			itemRan.Add(new GenItem(Tags.Clock));
			itemRan.Add(new GenItem(Tags.Magnet));
			itemRan.Add(new GenItem(Tags.Super));
			itemRan.Add(new GenItem(Tags.Swamm));
			this.itemGen = itemRan;
		}
		this.Add("Road", ranRoad);
		this.Add("Grass", ranGrass);
		this.Add("Walk", ranWalk);
		this.Add("Soil", ranSoil);
		this.Add("Bitch", ranBitch);
		this.Add("River", ranRiver);
		this.Add("HightWay", ranHightWay);
		this.Add("Traffic", ranTraffic);


        //console.log(this.startIndex);
        let rem = this.MapStart(grass);
		walk.Execute(this.arrayData, this.uimap);
        rem.Execute(this.arrayData, this.uimap);
		for (let i = 0; i < 5; i++) {
			this.newExecute();
        }

        //river.Execute(this.arrayData, this.uimap);
        //highway.Execute(this.arrayData, this.uimap);
        //traffic.Execute(this.arrayData, this.uimap);
        //bitch.Execute(this.arrayData, this.uimap);
	}
    private startIndex = 7;
	_InitPos() {
		let follow = Camera.main.getComponent(FollowPlayer);
		let pos = new cc.Vec2(this.startIndex - 1, Math.floor(this.uimap.width / 2) + this.uimap.sideSizeDown);
		if (GameMgr.isStarted) {
			Camera.main.Position = cc.Vec2.ZERO;
			this.player.SetPos(pos);
			this.player.ApplyUIPos();
			this.player.ReLife(true);
			this.player.getComponent(OnForward).Init();
			follow.Init();
			follow.Run();
			console.log("runner:: real->" + this.player.GetPos() + "ui->" + this.player.getComponent(Transform).Position + " node->" + this.player.node.position);
		} else {
			this.player.ReLife(false);
			follow.Stop();
			Camera.main.Position = GameCoordinate.ToUIPosition(pos.add(cc.Vec2.RIGHT));
		}
    }
	private newExecute() {
		let type = this.uimap.GetALine(this.uimap.length - 1).wayType;
		if (this.itemGen != null) {
			if (!this.inValid(type) && Random.Range(0, 100) < 5)
				this.itemGen.Execute(this.arrayData, this.uimap);
		}
		let runer: ABeheviorTree = this.dict[type];
		if (runer == null) throw "Can Not Add This Type Dealer" + type;
		runer.Execute(this.arrayData, this.uimap);
	}
	private inValid(type: string) {
		return type == "Road" || type == "Bitch" || type == "Traffic" || type == "River";
	}
	private Add(type: string, runner: ABeheviorTree) {
		this.dict[type] = runner;
	}
    private offset: number = 11;
    update(dt) {
        if (GameMgr.isStarted) {
			if (this.player.GetPos().x >= this.uimap.length - this.offset) {
				this.newExecute();
            }
            let x = this.uimap.GetALine(this.player.GetPos().x - this.startIndex);
			if (x != null) {
				x.Dispose();
            }
        }
    }
    private NormalStart(grass: ABeheviorTree): ABeheviorTree {
        for (let i = 0; i < this.startIndex; i++) {
            grass.Execute(this.arrayData, this.uimap);
        }
        let rem = new RemoveObs();
        rem.Execute(this.arrayData, this.uimap);
        return rem;
    }
    private AddNav(g: AddGrass): ABeheviorTree {
        g.isAddOb = false;
        const count = 12;
        for (var i = 0; i < count; i++) {
            g.Execute(this.arrayData, this.uimap);
        }
        let grass = this.arrayData[1];
        for (let i = 0; i < count; i++) {
            let uig = this.uimap.GetALine(i);
            for (var j = this.uimap.sideSizeDown; j < this.uimap.centerLenght; j++) {
                this.uimap.AddAOb(grass, uig, j);
            }
        }
        RemoveObs.Remove(this.uimap.GetALine(3), 10);
        RemoveObs.Remove(this.uimap.GetALine(3), 9);
        RemoveObs.Remove(this.uimap.GetALine(3), 8);
        RemoveObs.Remove(this.uimap.GetALine(3), 7);
        RemoveObs.Remove(this.uimap.GetALine(3), 6);
        RemoveObs.Remove(this.uimap.GetALine(4), 9);
        RemoveObs.Remove(this.uimap.GetALine(4), 8);
        RemoveObs.Remove(this.uimap.GetALine(4), 7);
        RemoveObs.Remove(this.uimap.GetALine(5), 9);
        RemoveObs.Remove(this.uimap.GetALine(5), 8);
        RemoveObs.Remove(this.uimap.GetALine(5), 7);
        RemoveObs.Remove(this.uimap.GetALine(6), 9);
        RemoveObs.Remove(this.uimap.GetALine(6), 8);
        RemoveObs.Remove(this.uimap.GetALine(6), 7);
        RemoveObs.Remove(this.uimap.GetALine(7), 8);
        RemoveObs.Remove(this.uimap.GetALine(7), 7);
        RemoveObs.Remove(this.uimap.GetALine(7), 6);
        RemoveObs.Remove(this.uimap.GetALine(8), 6);
        RemoveObs.Remove(this.uimap.GetALine(9), 6);
        RemoveObs.Remove(this.uimap.GetALine(9), 7);
        RemoveObs.Remove(this.uimap.GetALine(9), 8);
        RemoveObs.Remove(this.uimap.GetALine(10), 8);
        RemoveObs.Remove(this.uimap.GetALine(11), 8);
        g.isAddOb = true;
        return new RemoveObs();
    }
}