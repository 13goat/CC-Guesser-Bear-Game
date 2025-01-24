// import { _decorator, Collider2D, Color, Component, Contact2DType, EventMouse, EventTouch, find, input, Input, instantiate, IPhysics2DContact, Node, PhysicsSystem2D, PolygonCollider2D, RigidBody2D, Sprite, Vec3 } from 'cc';
// import { Bear } from './Bear';
// const { ccclass, property } = _decorator;

// @ccclass('BearPart')
// export class BearPart extends Component {

//     @property
//     private id: string = "";

//     private _index: number;
//     private _collider: Collider2D;
//     private _rigid: RigidBody2D;
//     private _shadowMatch: Node = null;
//     private _clonePart: Node = null;
//     // private _guessCharacterManager: GuessCharacterView;

//     protected onEnable(): void {
//     }

//     protected start(): void {

//         this._init();
//         this._setInputActive(true);

//         // Registering global contact callback functions
//         // if (PhysicsSystem2D.instance) {
//         //     PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
//         //     PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
//         // }
//     }

//     private _init(): void {
//         this.id = this.node.name;
//         this._collider = this.node.getComponent(Collider2D);
//         this._rigid = this.node.getComponent(RigidBody2D);

//         this._collider.enabled = false;
//         this._rigid.enabled = false;

//         this._guessCharacterManager = find("/GuessBearUI/GuessBearManager").getComponent(GuessBearManager);

//         console.log(`------- ${this._guessCharacterManager.node.name}`);

//         if (this._collider) {
//             this._collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
//             this._collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
//         }
//     }

//     private _setInputActive(active: boolean): void {

//         this.node.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
//         this.node.on(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
//         this.node.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
//     }

//     private _onTouchStart(event: EventTouch): void {
//         this._collider.enabled = true;
//         this._rigid.enabled = true;

//         this._index = this.node.getSiblingIndex();

//         this.node.parent = this._guessCharacterManager.node.parent;

//         this._clonePart = instantiate(this.node);
//         this._clonePart.parent = this._guessCharacterManager.partPanel.getChildByPath("Panel/Part");
//         this._clonePart.getComponent(Sprite).enabled = false;
//         this._clonePart.setSiblingIndex(this._index);

//         let pos = event.getLocation();
//         this.node.setWorldPosition(new Vec3(pos.x, pos.y, 0));

//         this.node.scale = new Vec3(0.8, 0.8, 0.8);

//         this._shadowMatch = this._guessCharacterManager.bear.getChildByName(this.node.name);
//         this._guessCharacterManager.bear.getComponent(Bear).ChangePartColor(this._shadowMatch);
//         this._guessCharacterManager.bear.getComponent(Bear).EnableCollider2D(this._shadowMatch);
//         this._guessCharacterManager.bear.getComponent(Bear).EnableRigidBody2D(this._shadowMatch);
//     }

//     private _onTouchMove(event: EventTouch): void {
//         if (event.target.name == this.id) {
//             let pos = event.getLocation();
//             this.node.setWorldPosition(new Vec3(pos.x, pos.y, 0));
//         }
//     }

//     private _onTouchEnd(event: EventTouch): void {
//         this._clonePart.destroy();

//         this._collider.enabled = false;
//         this._rigid.enabled = false;
//         this.node.parent = this._guessCharacterManager.partPanel.getChildByPath("Panel/Part");
//         this.node.setSiblingIndex(this._index);

//         this._guessCharacterManager.bear.getComponent(Bear).DisableCollider2D(this._shadowMatch);
//         this._guessCharacterManager.bear.getComponent(Bear).DisableRigidBody2D(this._shadowMatch);

//         if (this._guessCharacterManager.isColliderMatch) {
//             this._guessCharacterManager.bear.getComponent(Bear).ShowPartColor(this._shadowMatch);
//             console.log("End with Match");
//             this._guessCharacterManager.CheckCompletedAllParts();

//             this.node.destroy();
//         } else {
//             this._guessCharacterManager.bear.getComponent(Bear).ShowPartShadow(this._shadowMatch);
//             this.node.scale = new Vec3(0.4, 0.4, 0.4);
//         }

//         console.log(`Touch End +++ ${this._guessCharacterManager.isColliderMatch}`);

//         this._guessCharacterManager.isColliderMatch = false;
//     }

//     private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
//         // will be called once when two colliders begin to contact
//         // console.log('onBeginContact');

//         if (selfCollider.node.name == otherCollider.node.name) {
//             this._guessCharacterManager.bear.getComponent(Bear).HilightPartColor(this._shadowMatch);
//             this._guessCharacterManager.isColliderMatch = true;
//             console.log(`onBeginContact +++ ${this._guessCharacterManager.isColliderMatch} + ${otherCollider.node.name}`);
//         } else {
//             this._guessCharacterManager.isColliderMatch = false;
//             console.log(`onBeginContact +++ ${this._guessCharacterManager.isColliderMatch}`);
//         }
//     }

//     private onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
//         // will be called once when the contact between two colliders just about to end.
//         // this._guessBearManager.isColliderMatch = false;
//         // console.log(`onEndContact +++ ${this._guessBearManager.isColliderMatch}`);
//     }

//     private onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
//         // will be called every time collider contact should be resolved
//         // console.log('onPreSolve');
//     }

//     private onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
//         // will be called every time collider contact should be resolved
//         // console.log('onPostSolve');
//     }

//     protected onDestroy(): void {
//         if (this._collider) {
//             this._collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
//             this._collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
//         }

//         this.node.off(Input.EventType.TOUCH_START, this._onTouchStart, this);
//         this.node.off(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
//         this.node.off(Input.EventType.TOUCH_END, this._onTouchEnd, this);
//     }

// }

