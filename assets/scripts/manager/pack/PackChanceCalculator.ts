import { _decorator, Component, Node, randomRangeInt } from 'cc';
import { Pack } from '../../items/Pack';

export class PackChanceCalculator{

    // Default BoxID --- "G" is rare
    private readonly packId: string[] = ["A", "B", "C", "D", "E", "F"];

    private readonly _maxBoxes = 6;
    private readonly _rareBoxId = "G";

    constructor(){}

    public createPack(): string[][] {

        const packs: string[][] = [];

        let randomRarePack = randomRangeInt(0, this._maxBoxes);
        console.log(`Rare Pack is ${randomRarePack+1}`);

        for (let index = 0; index < this._maxBoxes; index++) {
            const pack = this._createArrayOfRandomPack();

            // Remove 1 BoxID and Add "G" Rare
            if (index == randomRarePack) {
                pack.splice(randomRangeInt(0, this._maxBoxes), 1, this._rareBoxId);
            }
            // console.log(`Length : ${this.packId.length} --- ${pack}`);
            packs.push(pack);
        }
        console.log(packs)

        return packs;
    }

    private _createArrayOfRandomPack(): string[] {

        const newPack: string[] = []

        for (let index = 1; index <= this.packId.length; index++) {
            let random = Math.floor(Math.random() * index);
            newPack.splice(random, 0, this.packId[index - 1]);
        }
        // console.log(`Length : ${this.newPack.length} --- ${newPack}`);

        return newPack;
    }
}


