import { _decorator, Component, Vec3, Prefab, instantiate, Node } from 'cc';
import { CharacterCollectedData } from '../data/CharacterCollectedData';
import { CharacterStatus } from '../enum/CharacterStatus';
import { BoxUtil } from './BoxUtil';
const { ccclass, property } = _decorator;

@ccclass('CharacterUtil')
export class CharacterUtil extends Component {

    public static getIndexFromBearPart(partName: string): number {
        return parseInt(partName.substring(0, 2)) - 1;
    }

    public static checkCharacterCollected(characterId: string, characterCollected: CharacterCollectedData[]): boolean {
        const characterIndex = BoxUtil.convertIdToIndex(characterId);
        // console.log(`Character Id = ${characterCollected[characterIndex].id} /// Character Status = ${characterCollected[characterIndex].status}`);
        return characterCollected[characterIndex].status === CharacterStatus.COLLECTED;
    }

    public static instantiateCharacter(prefab: Prefab, parent: Node, scale: Vec3): Node {
        const character = instantiate(prefab);
        character.parent = parent;
        character.scale = scale;
        console.log(`Character Created`);
        return character;
    }

    static checkRareCharacter(selectedCharacterId: string) {
        return selectedCharacterId === "G";
    }
}


