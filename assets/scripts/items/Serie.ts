// import { _decorator, Button, CCInteger, CCString, Component, Enum, EventHandler, Node, Prefab, SpriteFrame } from 'cc';
// import { SerieStatus } from '../enum/SerieStatus';
// import { SerieManager } from '../manager/SerieManager';
// const { ccclass, property } = _decorator;

// enum SerieRank {
//     N,
//     R,
//     SR,
//     SSR
// }

// Enum(SerieRank);
// Enum(SerieStatus);
// @ccclass('Serie')
// export class Serie extends Component {

//     @property(CCString)
//     readonly id: string = "-";
//     @property
//     serieName: string = "-";
//     @property({ type: SerieRank })
//     rank: SerieRank = SerieRank.N;
//     @property(Prefab)
//     box: Node;
//     @property(SpriteFrame)
//     packSprite: SpriteFrame | null = null;
//     @property(SpriteFrame) 
//     preview: SpriteFrame | null = null;
//     @property({ type: SerieStatus })
//     status: SerieStatus = SerieStatus.EMPTY;
//     @property(Prefab)
//     bears: Node[] = [];
//     @property(Prefab)
//     parts: Node[] = [];

//     protected onEnable(): void {
//         this._initButton();
//     }

//     private _initButton(): void {
//         const clickEventHandler = new EventHandler();
//         clickEventHandler.target = this.node;
//         clickEventHandler.component = 'Serie';
//         clickEventHandler.handler = '_showPack';
//         clickEventHandler.customEventData = this.id;

//         const button = this.node.getComponent(Button);
//         button.clickEvents.push(clickEventHandler);
//     }

//     private _showPack(event: Event, customEventData: string): void {
//         SerieManager.Instance.showPack(parseInt(customEventData));
//     }
// }                                                                                                   