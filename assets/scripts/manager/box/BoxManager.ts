// import { _decorator, Button, Color, Component, instantiate, Node, EventHandler, Vec3 } from 'cc';
// import { Serie } from '../../items/Serie';
// import { GameStatus } from '../../enum/GameStatus';
// import { BoxUtil } from '../../utils/BoxUtil';
// import { CharacterStatus } from '../../enum/CharacterStatus';
// import { CollectedBearData } from '../../data/BearCollectedSerieData';
// import { DataManager } from '../../repository/SerieRepository';
// import { GameManager } from '../../core/GameManager';
// const { ccclass, property } = _decorator;

// @ccclass('BoxManager')
// export class BoxManager extends Component {

//     @property([Node])
//     public boxes: Node[] = [];

//     @property(Node)
//     private mainMenuButton: Node = null;

//     constructor() {
//         super();
//     }

//     protected onLoad(): void {
//         this._dataPreview.length = 0;
//         this._init();
//     }

//     private _init(): void {
//         this.mainMenuButton.active = true;
//         this._serieCollected = DataManager.instance.currentBearCollectedSerie;
//         this._dataPreview = this._getBearDataPreview(GameManager.instance.currentCharacterPackId);
//         this._setupBoxSprite(this._dataPreview, GameManager.instance.currentCharacterPackId);
//         this._showHomeButton(this._dataPreview);
//     }

//     private _bearCollectedCompare(boxId: string, bearCollectedSerie?: CollectedBearData[]): string {

//         let indexId = BoxUtil.convertIdToIndex(boxId);

//         if (bearCollectedSerie[indexId].status == CharacterStatus.COLLECTED) {
//             return "bear";
//         } else {
//             return "box";
//         }
//     }

//     private _getBearDataPreview(bearsId: string[]): string[] {

//         let dataList: string[] = [];

//         let index = 0;
//         bearsId.forEach(bearId => {
//             let data = this._bearCollectedCompare(bearId, this._serieCollected)    
//             dataList.push(data);
            
//             console.log(`${bearId} = Key : ${this._serieCollected[index].id} - Value:  ${this._serieCollected[index].status} ~~ ${dataList[index]}`);
//             index++;
//         });

//         console.log(dataList);

//         return dataList;
//     }


//     private _showHomeButton(previews: string[]): void {
//         for (let index = 0; index < previews.length; index++) {
//             if (previews[index] == "box") {
//                 this.mainMenuButton.active = false;
//                 break;
//             }
//         }
//     }
    
//     private _setupBoxSprite(dataListPreview: string[], packGroupSelected: string[]): void {
//         for (let index = 0; index < dataListPreview.length; index++) {
//             if (dataListPreview[index] == "bear") {
//                 GameManager.instance.userComponent.onCoinIncreased(8);
//                 let bearIndex = BoxUtil.convertIdToIndex(packGroupSelected[index]);
//                 let bear = instantiate(GameManager.instance.bears[bearIndex]);
//                 bear.parent = this.boxes[index];
//                 bear.setPosition(new Vec3(0, 40, 0));
//                 bear.setScale(new Vec3(0.5, 0.5, 0.5));
//             } else {
//                 let box = instantiate(GameManager.instance.currentSerie.getComponent(Serie).box);
//                 box.parent = this.boxes[index];
//                 box.setPosition(new Vec3(0, 0, 0));
//                 box.setScale(new Vec3(0.36, 0.36, 0.36));

//                 this._initButton(box.parent, packGroupSelected[index]);

//                 console.log(box.parent.name);

//                 // box.getChildByName("Box").getComponent(Box).id = GameManager.instance.packGroupSelected[index];
//             }
//         }
//     }

//     private _initButton(boxNode: Node, id: string): void {
//         const clickEventHandler = new EventHandler();
//         clickEventHandler.target = this.node;
//         clickEventHandler.component = 'BoxManager';
//         clickEventHandler.handler = '_showOpenBox';
//         clickEventHandler.customEventData = id;

//         const button = boxNode.getComponent(Button);
//         button.clickEvents.push(clickEventHandler);
//     }

//     private _showOpenBox(event: Event, customEventData: string): void {
//         GameManager.instance.eventTarget.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.SHOW_1_BOX, customEventData);
//         console.log(`Open 1 Box : ${customEventData}`);
//     }
// }