import { _decorator, Component, Node, randomRangeInt, js } from 'cc';
const { array } = js;
const { ccclass, property } = _decorator;

@ccclass('CharacterChanceCalculator')
export class CharacterChanceCalculator {

    constructor() { }

    public singleBoxOpen(pack: string[]): string {
        let randomBox = randomRangeInt(0, pack.length);

        return pack[randomBox];
    }

    /*
    public boxRandomOpen(openType: "single" | "pack"): string {

        // ถ้าเปิดทีละกล่อง ต้องให้สร้างใหม่ตลอด
        // แต่ถ้าเปิดทีละ 6 กล่อง ให้สร้างใหม่ เฉพาะเปิดกล่องที่ 1
        let boxes: string[]
        let randomId: string = "";

        switch (openType) {
            case "single": {
                boxes = this._createArrayOfRandomBoxID("single");
                const randomIndex = randomRangeInt(0, boxes.length);
                randomId = boxes[randomIndex];

                break;
            }
            case "pack": {
                boxes = LocalStorage.loadData(StorageKey.GROUP_OF_BOX_ID)

                if (boxes == null || boxes.length <= 10) {
                    boxes = this._createArrayOfRandomBoxID("pack");
                }

                const randomIndex = randomRangeInt(0, boxes.length);
                randomId = boxes[randomIndex];

                // Remove Index
                for (let index = boxes.length; index >= 0; index--) {
                    if (boxes[index] == randomId) {
                        boxes.splice(index, 1);
                    }
                }

                LocalStorage.saveData(StorageKey.GROUP_OF_BOX_ID, boxes);

                break;
            }
        }

        return randomId;
    }

    // เพิ่ม boxID โดยให้สลับตำแหน่งกัน 
    private _createArrayOfRandomBoxID(openType: "single" | "pack"): string[] {

        const boxes: string[] = [];

        // Calculate at 100 Boxs
        for (let index = 1; index <= 100; index++) {
            let random = Math.floor(Math.random() * index);
            let boxId = this._convertIndexRangeToBoxId(index, openType);
            boxes.splice(random, 0, boxId);
        }

        return boxes;
    }

    private _convertIndexRangeToBoxId(index: number, openType: "single" | "pack"): string {

        let rareRate: number = 0;
        const multiplier = (rateRate: number): number => { return Math.floor((100 - rateRate) / 5); }

        switch (openType) {
            case "single": {
                rareRate = 5
                break;
            }
            case "pack": {
                rareRate = 8
                break;
            }
        }

        const multiplyRate = multiplier(rareRate);

        if (1 <= index && index <= multiplyRate * 1) {
            return "A";
        }
        if ((multiplyRate * 1 + 1) <= index && index <= (multiplyRate * 2)) {
            return "B";
        }
        if ((multiplyRate * 2 + 1) <= index && index <= (multiplyRate * 3)) {
            return "C";
        }
        if ((multiplyRate * 3 + 1) <= index && index <= (multiplyRate * 4)) {
            return "D";
        }
        if ((multiplyRate * 4 + 1) <= index && index <= (multiplyRate * 5)) {
            return "E";
        }
        if ((multiplyRate * 5 + 1) <= index && index <= 100) {
            return "F";
        }
    }
        */
}