// import { _decorator, Component, director, instantiate, Node, Prefab, Sprite, Vec3 } from 'cc';
// import { BoxUtil } from '../../utils/BoxUtil';
// import { GameManager } from '../GameManager';
// import { Serie } from '../../items/Serie';
// import { CharacterStatus } from '../../enum/CharacterStatus';
// import { SaveLoad } from '../../utils/SaveLoad';
// import { StorageKey } from '../../enum/StorageKey';
// import { CollectedBearData } from '../../data/BearCollectedSerieData';
// import { Bear } from '../../items/Bear';
// const { ccclass, property } = _decorator;

// @ccclass('GalleryManager')
// export class GalleryManager extends Component {

//     @property(Prefab)
//     private characterAreaList: Node[] = [];
//     @property(Node)
//     private serieThumbnailArea: Node = null;

//     private _characters: Node[] = [];

//     private currentSerieSelected: number;

//     protected start(): void {
//         this._initCharacter();
//     }

//     private _initCharacter(): void {
        
//         let characterList = instantiate(this.characterAreaList[0]);
//         characterList.parent = this.node;
//         this._characters = characterList.children;
//         let bearCollectedSerieData = SaveLoad.ReadData(StorageKey.CHARACTER_COLLECTED_SERIE + "0");
//         this._setupBoxSprite(bearCollectedSerieData, this._characters);
//     }

//     private _setupBoxSprite(bearDataList: CollectedBearData[], character: Node[]): void {
//         for (let index = 0; index < character.length; index++) {
//             let bear = character[index];

//             if (bearDataList[index].status == CharacterStatus.COLLECTED) {
//                console.log(` ${index} ---- ${bearDataList[index].id}`);
//             } else {
//                 bear.getComponent(Bear).ShadowAllPartColor();
//             }
//         }
//     }
// }


