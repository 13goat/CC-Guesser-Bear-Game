import { _decorator, Collider2D, Color, Component, Contact2DType, EventTouch, Input, instantiate, IPhysics2DContact, Node, RigidBody2D, ScrollView, Sprite, SpriteRenderer, Vec3 } from 'cc';
import { PartViewModel } from '../viewModels/PartViewModel';
import { CharacterComponent } from '../component/CharacterComponent';
const { ccclass, property } = _decorator;

@ccclass('PartView')
export class PartView extends Component {

    private _viewModel: PartViewModel;

    public partsId: number[] = [];
    public parts: Node[] = [];
    private character: Node = null;
    @property(Node)
    private partArea: Node = null;
    private _isColliderMatch: boolean = false;
    private _partTarget: Node;

    protected onLoad(): void {
        // console.log('PartView onLoad');
        this._viewModel = new PartViewModel(this.getComponent(PartView));
        this._viewModel.onShareServiceListener();
    }

    protected start(): void {
        // console.log('PartView start');
    }

    private _initialize(): void {

        this.parts.forEach((part, index) => {
            this.partsId[index] = parseInt(part.name.substring(0, 1));
            part.getComponent(Collider2D).enabled = false;
            part.getComponent(RigidBody2D).enabled = false;

            part.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this._onBeginContact, this);
            part.getComponent(Collider2D).on(Contact2DType.END_CONTACT, this._onEndContact, this);

            this._onInputActive(part);
        });

    }

    // ใช้หรับรับข้อมูล ShareService จาก GueassCharacterViewModel
    public onSetupData(parts: Node[], character: Node): void {
        this.parts = parts;
        this.character = character;

        this._initialize();
        // console.log(`PartView onSetupData : ${this.parts.length} + ${this.character.name}`);
    }

    private _onInputActive(part: Node): void {
        part.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
        part.on(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
        part.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
        part.on(Input.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }

    private _offInputEvent(part: Node): void {
        part.off(Input.EventType.TOUCH_START, this._onTouchStart, this);
        part.off(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
        part.off(Input.EventType.TOUCH_END, this._onTouchEnd, this);
        part.off(Input.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
        
        part.getComponent(Collider2D).off(Contact2DType.BEGIN_CONTACT, this._onBeginContact, this);
        part.getComponent(Collider2D).off(Contact2DType.END_CONTACT, this._onEndContact, this);
    }

    private _clonePart: Node = null;

    private _onTouchStart(event: EventTouch): void {

        console.log(`Touch Start +++ ${event.target.name}`);

        this._clonePart = instantiate(event.target);
        this._clonePart.parent = event.target.parent;
        this._clonePart.setSiblingIndex(event.target.getSiblingIndex());
        this._clonePart.getComponent(Sprite).enabled = false;

        event.target.getComponent(Collider2D).enabled = true;
        event.target.getComponent(RigidBody2D).enabled = true;
        event.target.parent = this.node.parent;

        let pos = event.getLocation();
        event.target.setWorldPosition(new Vec3(pos.x, pos.y, 0));

        event.target.scale = new Vec3(1, 1, 1);
        this.partArea.getComponent(ScrollView).enabled = false;

        event.target.getComponent(Collider2D).enable = true;
        event.target.getComponent(RigidBody2D).enable = true;

        this._partTarget = this.character.children.find(child => event.target.name == child.name);
        this.character.getComponent(CharacterComponent).onToggleCollider2D(this._partTarget, true);
        this.character.getComponent(CharacterComponent).onToggleRigidBody2D(this._partTarget, true);
    }

    private _onTouchMove(event: EventTouch): void {
        // console.log(`Touch Move +++ ${event.target.name}`);
        let pos = event.getLocation();
        event.target.setWorldPosition(new Vec3(pos.x, pos.y, 0));
    }

    private _onTouchEnd(event: EventTouch): void {
        // console.log(`Touch End +++ ${event.target.name}`);
        this._onTouchEndOrCancel(event);

    }

    private _onTouchCancel(event: EventTouch): void {
        // console.log(`Touch Cancel +++ ${event.target.name}`);
        this._onTouchEndOrCancel(event);
    }

    private _onTouchEndOrCancel(event: EventTouch): void {
        event.target.parent = this.partArea.getChildByPath("Panel/Part");
        event.target.setSiblingIndex(this._clonePart.getSiblingIndex());
        const sprite = event.target.getComponent(Sprite);
        const collider2D = event.target.getComponent(Collider2D);
        const rb2D = event.target.getComponent(RigidBody2D)

        sprite.enabled = true;
        collider2D.enabled = false;
        rb2D.enabled = false;

        this.character.getComponent(CharacterComponent).onToggleCollider2D(this._partTarget, false);
        this.character.getComponent(CharacterComponent).onToggleRigidBody2D(this._partTarget, false);

        this._clonePart.destroy();
        event.target.scale = new Vec3(0.4, 0.4, 0.4);

        this.partArea.getComponent(ScrollView).enabled = true;

        if (this._isColliderMatch) {
            this.character.getComponent(CharacterComponent).onChangePartColor(this._partTarget);

            this._offInputEvent(event.target);
            event.target.destroy();
            console.log("End with Match");
            
            this._CheckCompletedAllParts();
        } else {
            console.log("End with Un-Match");
            this.character.getComponent(CharacterComponent).onChangePartShadow(this._partTarget);
        }

        this._isColliderMatch = false;

    }

    private _onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        // // will be called once when two colliders begin to contact
        // console.log('onBeginContact');

        if (selfCollider.node.name == otherCollider.node.name) {
            this.character.getComponent(CharacterComponent).onHighLightPartColor(otherCollider.node);
            this._isColliderMatch = true;
            console.log(`onBeginContact +++ Match ${otherCollider.node.name} &&& ColliderMatch = ${this._isColliderMatch}`);
        } else {
            this._isColliderMatch = false;
            console.log(`onBeginContact +++ Doesn't Match ${otherCollider.node.name} &&& ColliderMatch = ${this._isColliderMatch}`);
        }
    }

    private _onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        // will be called once when the contact between two colliders just about to end.
        // this._isColliderMatch = false;
        console.log(`onEndContact +++ ColliderMatch = ${this._isColliderMatch}`);
    }

    private _onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called every time collider contact should be resolved
        // console.log('onPreSolve');
    }

    private _onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called every time collider contact should be resolved
        // console.log('onPostSolve');
    }

    private _CheckCompletedAllParts(): void {
        console.log(`Part left : ${this.partArea.getComponent(ScrollView).content.children.length}`);

        // รวม Panel และ Part Node
        if (this.partArea.getComponent(ScrollView).content.children.length <= 2) {
            this._viewModel.onAllPartsCompletedShareService(true);
        }

    }

}