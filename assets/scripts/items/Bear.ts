// import { _decorator, Collider2D, Color, Component, Node, RigidBody2D, Sprite, SpriteFrame, SpriteRenderer } from 'cc';
// import { BearPart } from './BearPart';
// import { OldGameManager } from '../core/disable-OldGameManager';
// import { GameStatus } from '../enum/GameStatus';
// import { CharacterUtil } from '../utils/CharacterUtil';
// const { ccclass, property } = _decorator;

// @ccclass('Bear')
// export class Bear extends Component {

//     @property
//     private id: number;

//     @property
//     private isTargetShadow: boolean = false;

//     @property(SpriteFrame)
//     private color: SpriteFrame[] = [];
//     @property(SpriteFrame)
//     private white: SpriteFrame[] = [];

//     protected onLoad(): void {
//         this._prepareBearColor();
//     }

//     private _prepareBearColor(): void {
//         if (this.isTargetShadow
//             && OldGameManager.instance.GameMenuState != GameStatus.SHOW_6_BOX
//             && OldGameManager.instance.GameMenuState != GameStatus.SHOW_Gallery) {
//             this.ShadowAllPartColor();
//         }
//     }


//     public ChangePartColor(part: Node): void {
//         part.getComponent(Sprite).color = Color.GREEN;
//     }

//     public HilightPartColor(part: Node): void {
//         part.getComponent(Sprite).color = Color.CYAN;
//     }

//     public DefaultAllPartColor(): void {
//         let index: number = 0;
//         this.node.children.forEach(child => {
//             child.getComponent(Sprite).spriteFrame = this.color[CharacterUtil.getIndexFromBearPart(child.name)];
//             this.ShowPartColor(child);
//             index++;
//         });
//     }

//     public ShadowAllPartColor(): void {
//         let index: number = 0;
//         this.node.children.forEach(child => {
//             child.getComponent(Sprite).spriteFrame = this.white[CharacterUtil.getIndexFromBearPart(child.name)];
//             this.ShowPartShadow(child);
//             index++;
//         });
//     }

//     public ShowPartShadow(part: Node): void {
//         part.getComponent(Sprite).color = Color.BLACK;
//     }

//     public ShowPartColor(part: Node): void {

//         let index = CharacterUtil.getIndexFromBearPart(part.name);

//         part.getComponent(Sprite).color = Color.WHITE;
//         part.getComponent(Sprite).spriteFrame = this.color[index];
//     }

//     public EnableCollider2D(part: Node) {
//         part.getComponent(Collider2D).enabled = true;
//         console.log(`Part ${part.name} Collider2d Enable ::: ${part.getComponent(Collider2D).enabled}`);
//     }

//     public DisableCollider2D(part: Node) {
//         part.getComponent(Collider2D).enabled = false;
//         console.log(`Part ${part.name} Collider2d Disable ::: ${part.getComponent(Collider2D).enabled}`);
//     }

//     public EnableRigidBody2D(part: Node) {
//         part.getComponent(RigidBody2D).enabled = true;
//     }

//     public DisableRigidBody2D(part: Node) {
//         part.getComponent(RigidBody2D).enabled = false;
//     }
// }

