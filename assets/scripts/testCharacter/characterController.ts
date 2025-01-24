import { _decorator, Component, Node, SkeletalAnimation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('characterController')
export class characterController extends Component {

    @property(Node)
    character: Node = null;

    @property([Node])
    parts: Node[] = [];

    private static _partIndex: number = 0;

    protected start(): void {
        let bearPart = this.character.getChildByPath("FArmature").children;

        for (let i = 0; i < bearPart.length; i++) {
            this.parts.push(bearPart[i]);
        }   
    }

    public ShowHideCharacter(): void {
        this.character.active = !this.character.active;

    }

    public PlayAnimation(): void {
        let anim = this.character.getComponent(SkeletalAnimation)
        anim.play();
    }

    public ShowHidePart(): void {
        if (this.parts[0] != null) {
            this.parts.forEach(element => {
                element.active = true;
            });
            this.parts[characterController._partIndex].active = false;

            characterController._partIndex++;

            if (characterController._partIndex >= this.parts.length) {
                characterController._partIndex = 0;
            }
        } else {
            console.log("Parts are null");
        }

    }


}


