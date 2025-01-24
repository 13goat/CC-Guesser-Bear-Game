import { _decorator, Component, Node, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CharacterChangePart')
export class CharacterChangePart extends Component {

    @property({type:sp.Skeleton, tooltip:"KnightBlueSword"})
    knightBlueSword:sp.Skeleton | null = null;

    @property({type:sp.Skeleton, tooltip:"KnightGreySword"})
    knightGreySword:sp.Skeleton | null = null;

    start() {
        let parts = "sword";
        for(let i = 0; i < parts.length; i++) {
            let blueSword = this.knightBlueSword.findSlot(parts);
            let greySword = this.knightGreySword.findSlot(parts);
            let attachment = greySword.getAttachment();
            blueSword.setAttachment(attachment);
        }
    }

    update(deltaTime: number) {
        
    }
}


