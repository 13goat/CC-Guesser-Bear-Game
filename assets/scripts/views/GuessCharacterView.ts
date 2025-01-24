import { _decorator, Component, SpriteFrame, Sprite, Vec3, Widget, Layout, Node, ScrollView } from 'cc';
import { GuessCharacterViewModel } from '../viewModels/GuessCharacterViewModel';
import { CharacterComponent } from '../component/CharacterComponent';
import { RigidBody2D, BoxCollider2D, ERigidBody2DType, Layers } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GuessCharacterView')
export class GuessCharacterView extends Component {

    @property(Node)
    public partArea: Node = null;
    @property(Node)
    private mainMenuButton: Node = null;
    @property(Node)
    private playOtherCharacterButton: Node = null;
    @property(Sprite)
    private bg: Sprite = null;

    private _character: Node;
    private _viewModel: GuessCharacterViewModel;
    private _parts: Node[] = [];

    onLoad() {
        this._viewModel = new GuessCharacterViewModel(this.getComponent(GuessCharacterView));
    }

    start() {
        this._initialize();
    }

    private _initialize(): void {
        this._viewModel.onSetupCharacter();
        if (this._viewModel.IsCharacterCollected()) {
            this._setButtonActive(true);
            this._setPartPanelActive(false);
        } else {
            this._setButtonActive(false);
            this._setPartPanelActive(true);
            this._viewModel.onInstantiatePart();
            this._viewModel.onShareService(this._parts, this._character);
        }

        this._viewModel.changeBG(this.bg);
        this._viewModel.onSharePartsDataServiceListener();
    }

    public setupCharacter(character: Node): void {
        this._character = character;
        this._character.scale = new Node().scale.set(1, 1, 1);
        // console.log(`Character name = ${this._character.name}`);
    }

    public instantiatePart(character: Node): Node {
        const parts = this._createAllParts(character);
        parts.parent = this.partArea.children[0];
        this.partArea.getComponent(ScrollView).content = parts;

        parts.children.forEach((part, index) => {
            this._parts[index] = part;
        });

        return parts;
    }

    private _createAllParts(character: Node): Node {
        this._character = character;
        const partParent = new Node('Part');
        partParent.layer = Layers.Enum.UI_2D;
        partParent.addComponent(Layout);
        partParent.getComponent(Layout).type = Layout.Type.HORIZONTAL;
        partParent.getComponent(Layout).alignHorizontal = true;
        partParent.getComponent(Layout).resizeMode = Layout.ResizeMode.CONTAINER;
        partParent.getComponent(Layout).paddingLeft = 50;
        partParent.getComponent(Layout).paddingRight = 50;
        partParent.getComponent(Layout).spacingX = 100;
        partParent.getComponent(Layout).horizontalDirection = Layout.HorizontalDirection.LEFT_TO_RIGHT;
        partParent.getComponent(Layout).affectedByScale = true;

        const partSpriteFrames: SpriteFrame[] = this._character.getComponent(CharacterComponent).getPartSprite();

        partSpriteFrames.forEach(spriteFrame => {
            const part = new Node(spriteFrame.name);
            part.layer = Layers.Enum.UI_2D;
            part.addComponent(Sprite);
            part.getComponent(Sprite).spriteFrame = spriteFrame;

            part.addComponent(RigidBody2D);
            part.getComponent(RigidBody2D).enabled = false;
            part.getComponent(RigidBody2D).enabledContactListener = true;
            part.getComponent(RigidBody2D).type = ERigidBody2DType.Kinematic;

            part.addComponent(BoxCollider2D);
            part.getComponent(BoxCollider2D).enabled = false;
            part.scale = new Vec3(0.4, 0.4, 0.4)

            partParent.addChild(part);
        });

        partParent.addComponent(Widget);
        partParent.getComponent(Widget).isAlignLeft = true;
        partParent.getComponent(Widget).isAlignTop = true;
        partParent.getComponent(Widget).isAlignBottom = true;
        partParent.getComponent(Widget)!.left = 0;
        partParent.getComponent(Widget)!.top = 50;
        partParent.getComponent(Widget)!.bottom = 50;

        return partParent;
    }

    private _setPartPanelActive(active: boolean): void {
        this.partArea.active = active;
    }

    private _setButtonActive(active: boolean): void {
        this.mainMenuButton.active = active;
        this.playOtherCharacterButton.active = active;
    }

    public onAllPartsCompleted(): void {
        this._setPartPanelActive(false);
        this._setButtonActive(true);
    }

}