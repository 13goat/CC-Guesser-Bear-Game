import { _decorator, Component, director, Node, Prefab, find, EventTarget } from 'cc';
import { GameStatus } from '../enum/GameStatus';
import { UIManager } from './UIManager';
import { StorageKey } from '../enum/StorageKey';
import { DafaultData } from '../data/DefaultData';
import { SaveLoad } from '../utils/SaveLoad';
import { BoxUtil } from '../utils/BoxUtil';
import { CharacterStatus } from '../enum/CharacterStatus';
import { UserModel } from '../models/UserModel';
import { UserComponent } from '../component/UserComponent';
import { DataManager } from '../repository/SerieRepository';
const { ccclass, property } = _decorator;

@ccclass('OldGameManager')
export class OldGameManager extends Component{

//     private static _instance: OldGameManager;
//     public static eventTarget = new EventTarget();

//     private _status: GameStatus = GameStatus.START;
//     public get gameStatus(): GameStatus {
//         return this._status
//     }

//     private set gameStatus(status: GameStatus) {
//         this._status = status;
//         OldGameManager.eventTarget.emit("statusChanged", status);
//     }

//     private constructor() {
//         super();
//     }

//     public static get instance() {
//         if (!this._instance) {
//             this._instance = new OldGameManager();
//         }
//         return this._instance;
//     }

    

//     public packGroupSelected: string[] = [];
    
//     private userComponent: UserComponent;

//     private _userData: UserModel;

//     public get currentCoin(): number {
//         return this._userData.coin;
//     } 
//     public set currentCoin(newCoin: number) {
//         this._userData.coin = newCoin;
//     }

//     public addCoin(amount: number): void {
//         this._userData.coin += amount;
//         OldGameManager.eventTarget.emit(GameStatus.COIN_UPDATED, this._userData.coin);
//     }

//     @property([Node])
//     public series: Node[] = [];

//     private _gameMenuState: GameStatus;

//     public get GameMenuState() {
//         return this._gameMenuState
//     }

//     public bearGuess: Node = null;
//     public bears: Node[];
//     public bearParts: Node[];
//     public currentBoxId: string;

//     private _currentSerieIndex: number = 0;
//     public get currentSerieIndex(): number {
//         return this._currentSerieIndex;
//     }
//     public get currentSerie(): Node {
//         return this.series[this._currentSerieIndex];
//     }

//     public GAME_EVENT_LISTENING: string = "game status event listening";

//     protected start(): void {
//         // localStorage.clear();
//         this._test();
//         this._initialzie();
//     }

//     private _initialzie() {
//         this.userComponent = this.node.getComponent(UserComponent);
//     }

//     private _test(): void {
//         SaveLoad.SaveData(StorageKey.USER_DATA, MockupData.userData);
//         SaveLoad.SaveData(StorageKey.SERIES_COLLECTED, MockupData.serieCollected);
//         SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + "0", MockupData.bearCollectedSerie1);
//         SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + "1", MockupData.bearCollectedSerie2);

//         this.scheduleOnce(function () {
//             console.log(`////// READ //////`);
//             // ต้องสร้าง Object Type สำหรับรับแปลงข้อมูล
//             // let data = SaveLoad.ReadData<SerieData[]>(StorageKey.SERIES_COLLECTED);
//             // console.log(`Read Outside ::: ${data[1].serieId} ++ ${data[1].status}`);

//             this._userData = SaveLoad.ReadData(StorageKey.USER_DATA);
//             SaveLoad.ReadData<CollectedBearData[]>(StorageKey.CHARACTER_COLLECTED_SERIE + "0");

//             this.updateGameSate(GameStatus.START);
//         }, 2);
//     }

    // public updateGameSate(gameMenu: GameStatus, arg?: any): void {
    //     this._gameMenuState = gameMenu;

    //     switch (gameMenu) {
    //         case GameStatus.START:
    //             {
    //                 this.userComponent.nameLabel.string = this._userData.name;
    //                 this.userComponent.coinLabel.string = this._userData.coin.toString();
    //                 console.log(`Status ::: Start Game ${this._userData.coin.toString()}`);
    //                 break;
    //             }
    //         case GameStatus.SHOW_SERIE:
    //             {
    //                 console.log(`Status ::: Main`);
    //                 break;
    //             }
    //         case GameStatus.SHOW_PACK:
    //             {
    //                 this._currentSerieIndex = arg;
    //                 this.bears = this.series[arg].getComponent(Serie).bears;
    //                 this.bearParts = this.series[arg].getComponent(Serie).parts;
    //                 UIManager.instance.event.emit(UIManager.instance.UI_EVENT_LISTENING, gameMenu);
    //                 console.log(`Status ::: Show Pack ::: index ${this._currentSerieIndex}`);
    //             }
    //         case GameStatus.SHOW_BOX:
    //             {
    //                 let key = StorageKey.BEAR_COLLECTED_SERIE + this._currentSerieIndex.toString();
    //                 let data = SaveLoad.ReadData<bearCollectedSerieData[]>(key);
    //                 console.log(key);
    //                 DataManager.instance.currentBearCollectedSerie = data;

    //                 this.packGroupSelected = arg;
    //                 UIManager.instance.event.emit(UIManager.instance.UI_EVENT_LISTENING, gameMenu, arg);
    //                 console.log(`Status ::: SelectSerie`);
    //                 break;
    //             }
    //         case GameStatus.SHOW_6_BOX:
    //             {
    //                 UIManager.instance.event.emit(UIManager.instance.UI_EVENT_LISTENING, gameMenu, arg);
    //                 console.log(`Status ::: Show 6 Box`);
    //                 break;
    //             }
    //         case GameStatus.SHOW_1_BOX:
    //             {
    //                 this.currentBoxId = arg;
    //                 UIManager.instance.event.emit(UIManager.instance.UI_EVENT_LISTENING, gameMenu, arg);
    //                 console.log(`Status ::: ShowBox`);
    //                 break;
    //             }
    //         case GameStatus.PEEL_BOX:
    //             {
    //                 UIManager.instance.event.emit(UIManager.instance.UI_EVENT_LISTENING, gameMenu);
    //                 console.log(`Status ::: PeelBox`);
    //                 break;
    //             }
    //         case GameStatus.OPEN_BOX_FINISHED:
    //             {
    //                 UIManager.instance.event.emit(UIManager.instance.UI_EVENT_LISTENING, gameMenu, arg);
    //                 console.log(`Status ::: Open Box`);
    //                 break;
    //             }
    //         case GameStatus.GUESS_BEAR:
    //             {
    //                 UIManager.instance.event.emit(UIManager.instance.UI_EVENT_LISTENING, gameMenu);
    //                 console.log(`Status ::: Guess Bear`);
    //                 break;
    //             }
    //         case GameStatus.COMPLETED:
    //             {
    //                 let key = StorageKey.BEAR_COLLECTED_SERIE + this._currentSerieIndex.toString();
    //                 DataManager.instance.currentBearCollectedSerie[boxUtil.convertIdToIndex(this.currentBoxId)].status = BearStatus.COLLECTED;
    //                 SaveLoad.SaveData(key, DataManager.instance.currentBearCollectedSerie);
    //                 UIManager.instance.event.emit(UIManager.instance.UI_EVENT_LISTENING, gameMenu);
    //                 console.log(`Status ::: Completed`);
    //                 break;
    //             }
    //         case GameStatus.SHOW_Gallery:
    //             {
    //                 let key = StorageKey.BEAR_COLLECTED_SERIE + "0";
    //                 let data = SaveLoad.ReadData<bearCollectedSerieData[]>(key);

    //                 UIManager.instance.event.emit(UIManager.instance.UI_EVENT_LISTENING, gameMenu);
    //                 console.log(`Status ::: Show Gallery`);
    //                 break;
    //             }
    //         case GameStatus.SHOW_CHARACTER:
    //             {
    //                 console.log(`Status ::: Show Character`);
    //                 break;
    //             }
    //         case GameStatus.PITCH_AND_TOSS:
    //             {
    //                 console.log(`Status ::: Pitch And Toss`);
    //                 break;
    //             }
    //         case GameStatus.SETTING:
    //             {
    //                 console.log(`Status ::: Setting`);
    //                 break;
    //             }
    //         default: {

    //         }
    //     }

    // }    
 

    // protected onDestroy(): void {
    //     console.log("GameManager Destroy");
    //     this.node.off(this.GAME_EVENT_LISTENING, (gameMenu: GameStatus) => {
    //         this.updateGameSate(gameMenu);
    //     }, this);
    // }
}