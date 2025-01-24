import { _decorator, Component, Vec3, Prefab, instantiate, Node  } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoxUtil')
export class BoxUtil extends Component {

    public static instantiatedBox(prefab: Prefab, parent: Node, scale: Vec3): Node {
        const box = instantiate(prefab);
        box.parent = parent;
        box.scale = scale;
        return box;
    }

    public static convertIdToIndex(bearId: string): number {
        let index = 0;
        switch (bearId) {
            case "A": {
                index = 0;
            } break;
            case "B": {
                index = 1;
            } break;
            case "C": {
                index = 2;
            } break;
            case "D": {
                index = 3;
            } break;
            case "E": {
                index = 4;
            } break;
            case "F": {
                index = 5;
            } break;
            case "G": {
                index = 6;
            } break;
        }

        // console.log(`Bear ID : ${bearId} == ${index}`);
        return index;
    }

    public static convertIndexToId(bearIndex: number): string {
        let id = "";
        switch (bearIndex) {
            case 0: {
                id = "A";
            } break;
            case 1: {
                id = "B";
            } break;
            case 2: {
                id = "C";
            } break;
            case 3: {
                id = "D";
            } break;
            case 4: {
                id = "E";
            } break;
            case 5: {
                id = "F";
            } break;
            case 6: {
                id = "G";
            } break;
        }

        // console.log(`Bear Index : ${bearIndex} == ${id}`);
        return id;
    }
}


