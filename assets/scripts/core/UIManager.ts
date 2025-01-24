import { _decorator, Button, Component, director, EventTarget, find, instantiate, Label, Node, Prefab, Vec3 } from 'cc';
import { GameStatus } from '../enum/GameStatus';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    
    @property(Node)
    public uiGroup: Node | null = null;
    @property(Prefab)
    public mainUI: Prefab | null = null;
    @property(Prefab)
    public packSelectionUI: Prefab | null = null;
    @property(Prefab)
    public boxSelectionUI: Prefab | null = null;
    @property(Prefab)
    public boxOpeningUI: Prefab | null = null;
    @property(Prefab)
    public show6BoxUI: Prefab | null = null;
    @property(Prefab)
    public textLabel: Prefab | null = null;
    @property(Prefab)
    public guessBearUI: Prefab | null = null;
    @property(Prefab)
    public galleryCollcetedUI: Prefab | null = null;
    @property(Prefab)
    public galleryCharacterUI: Prefab | null = null;

    private _mainUIInstance: Node = null;
    private _packUIInstance: Node = null;
    private _boxSelectUIInstance: Node = null;
    private _boxOpeningUIInstance: Node = null;
    private _show6BoxUIInstance: Node = null;
    private _textLabel: Node = null;
    private _guessBearUIInstance: Node = null;
    private _galleryCollectedUIInstance: Node = null;
    private _galleryCharacterUIInstance: Node = null;

    public updateUI(status: GameStatus, eventData1?: any, eventData2?: any, eventData3?: any): void {

        console.log(`Lisening ChangeMenu +++ State = ${status}, data = ${eventData1}`);

        switch (status) {
            case GameStatus.START:
                {
                    GameManager.instance.eventTarget.emit(GameManager.instance.ACTIVE_USER_LABEL, true);
                    this._resetSceneUI();
                    console.log(`UI ::: Start Game`);
                }
                break;
            case GameStatus.SHOW_SERIE:
                {
                    console.log(`UI ::: Main`);
                }
                break;
            case GameStatus.SHOW_PACK:
                {
                    GameManager.instance.currentSerieId = eventData1; // SerieID เริ่มที่ 1
                    this._packUIInstance = this._showUI(this._packUIInstance, this.packSelectionUI, eventData1);
                }
                break;
            case GameStatus.BOX_SELECTION:
                {
                    GameManager.instance.currentCharacterPackId = eventData1;
                    this._boxSelectUIInstance = this._showUI(this._boxSelectUIInstance, this.boxSelectionUI, eventData1);
                }
                break;
            case GameStatus.SHOW_1_BOX:
                {
                    GameManager.instance.currentCharacterPackId = eventData1;
                    this._boxOpeningUIInstance = this._showUI(this._boxOpeningUIInstance, this.boxOpeningUI, eventData1);
                }
                break;
            case GameStatus.SHOW_6_BOX:
                {
                    this._show6BoxUIInstance = this._showUI(this._show6BoxUIInstance, this.show6BoxUI, eventData1);
                }
                break;
            case GameStatus.OPEN_BOX_FINISHED:
                {
                    // isCharacterCollected from BoxController
                    // eventData2 สำหรับตรวจว่า เก็บตัวละครครบหรือยัง
                    if (eventData1.length > 1) { // แบบเปิด 6 กล่อง
                        this._textLabel = this._showUI(this._textLabel, this.textLabel, eventData1, this._show6BoxUIInstance);
                        this._textLabel.position = new Vec3(0, -100, 0);
                        this._textLabel.getComponent(Label).string = eventData2 ? "All Character Collected, tap to start again" : "Select one character to continue";
                    } else { // แบบเปิด 1 กล่อง
                        this._textLabel = this._showUI(this._textLabel, this.textLabel, eventData1, this._boxOpeningUIInstance);
                        this._textLabel.getComponent(Label).string = eventData2 ? "Character Collected, tap to start again" : "Tap anywhere to continue";
                    } console.log(`UI ::: Open Box`);
                }
                break;
            case GameStatus.GUESS_BEAR:
                {
                    GameManager.instance.eventTarget.emit(GameManager.instance.ACTIVE_USER_LABEL, false);
                    GameManager.instance.selectedCharacterId = eventData1;
                    this._guessBearUIInstance = this._showUI(this._guessBearUIInstance, this.guessBearUI, eventData1);

                    // eventData2 = Character Node ที่เลือก ย้าย Canvas ใหม่
                    GameManager.instance.character = eventData2;
                    GameManager.instance.character.parent = this._guessBearUIInstance;

                    console.log(`UI ::: Guess Bear`);
                }
                break;
            case GameStatus.SHOW_Gallery:
                {
                    this._galleryCollectedUIInstance = this._showUI(this._galleryCollectedUIInstance, this.galleryCollcetedUI, eventData1);
                    console.log(`UI ::: Show Collection`);
                }
                break;
            case GameStatus.SHOW_CHARACTER:
                {
                    this._galleryCharacterUIInstance = this._showUI(this._galleryCharacterUIInstance, this.galleryCharacterUI, eventData1);
                    console.log(`UI ::: Show Character`);
                }
                break;
            case GameStatus.PITCH_AND_TOSS:
                {
                    console.log(`UI ::: Pitch And Toss`);
                }
                break;
            case GameStatus.SETTING:
                {
                    console.log(`UI ::: Setting`);
                }
                break;
            default: {
            }
                break;
        }
    }

    private _showUI(uiNode: Node, nodeToCreate: Prefab, eventData?: string, parent?: Node): Node {
        // console.log(`${uiNode} - IsNull - ${uiNode == null}`);
        if (uiNode) {
            uiNode.active = true;
            console.log(`${uiNode.name} - active`);

            if (!uiNode.isValid) {

                uiNode = instantiate(nodeToCreate);
                uiNode.parent = this.uiGroup;

                // console.log(`${uiNode.name} - instantiate again`);
            }
        } else {
            uiNode = instantiate(nodeToCreate);
            if (parent) {
                uiNode.parent = parent;
                // console.log(`Parent is --- ${parent.name}`);
            } else {
                uiNode.parent = this.uiGroup;
            }

            // console.log(`${uiNode.name} - instantiate`);
        }

        console.log(`UI ::: Show ${uiNode.name} +++ ${eventData}`);
        return uiNode;
    }

    private _releaseUiNode(uiNode: Node): Node {
        if (uiNode) {
            uiNode.destroy();
            uiNode = null;
        }

        return uiNode;
    }

    private _resetSceneUI(): void {
        this._mainUIInstance = this._releaseUiNode(this._mainUIInstance);
        this._packUIInstance = this._releaseUiNode(this._packUIInstance);
        this._boxSelectUIInstance = this._releaseUiNode(this._boxSelectUIInstance);
        this._boxOpeningUIInstance = this._releaseUiNode(this._boxOpeningUIInstance);
        this._show6BoxUIInstance = this._releaseUiNode(this._show6BoxUIInstance);
        this._textLabel = this._releaseUiNode(this._textLabel);
        this._guessBearUIInstance = this._releaseUiNode(this._guessBearUIInstance);
        // this._galleryCollectedUIInstance = this._releaseUiNode(this._galleryCollectedUIInstance);
        this._galleryCharacterUIInstance = this._releaseUiNode(this._galleryCharacterUIInstance);
    }

}