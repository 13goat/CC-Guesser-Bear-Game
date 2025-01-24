import { Vec3, Sprite, Node } from "cc";
import { GameManager } from "../core/GameManager";
import { GalleryModel } from "../models/GalleryModel";
import { CharacterUtil } from "../utils/CharacterUtil";
import { GalleryView } from "../views/GalleryView";
import { CharacterStatus } from "../enum/CharacterStatus";
import { SerieView } from "../views/SerieView";

export class GalleryViewModel {

    private _view: GalleryView;
    private _model: GalleryModel;
    private _serieNodes: Node[] = [];

    constructor(view: GalleryView, serieNodes: Node[]) {
        this._view = view;
        this._serieNodes = serieNodes;
        const serieRePository = GameManager.instance.serieRepository;
        this._model = new GalleryModel(
            serieRePository.loadCurrentCharacterCollectedSerie(GameManager.instance.currentSerieId),
            serieRePository.currentSerieView,
            this._serieNodes);
    }

    public initializeCharacter() {
        const defautCharacterScale: Vec3 = new Vec3(1, 1, 1);
        for (let index = 0; index < this._view.characterPositionNode.length; index++) {

            const characterPrefab = this._model.serieView.characters[index];
            if (this._view.characterPositionNode[index].children.length > 0) {
                this._view.characterPositionNode[index].removeAllChildren();
            }
            const character = CharacterUtil.instantiateCharacter(characterPrefab, this._view.characterPositionNode[index], defautCharacterScale);

            this._view.onSetupCharacterColor(character, this._model.characterCollected[index].status === CharacterStatus.COLLECTED);
        }
    }

    public changeBG(bgSprite: Sprite): void {
        bgSprite.spriteFrame = this._model.serieView.background[3];
    }

    public onSeriesSelection(bgSprite: Sprite, serieId: number): void {

        if (GameManager.instance.serieRepository.seriesData[serieId - 1]) {
            this._model.characterCollected = GameManager.instance.serieRepository.loadCurrentCharacterCollectedSerie(serieId);
            this._model.serieView = GameManager.instance.serieRepository.seriesData[serieId - 1].getComponent(SerieView);

            this.initializeCharacter();
            this.changeBG(bgSprite);
        }
        else {
            console.log(`SerieView of Serie${serieId} not found`);
        }
    }

}