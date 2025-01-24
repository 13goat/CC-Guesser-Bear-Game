import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShowCharacterPackViewModel')
export class ShowCharacterPackViewModel {

    constructor() {}

    private _bearCollectedCompare(boxId: string, bearCollectedSerie?: bearCollectedSerieData[]): string {

        let indexId = boxUtil.convertIdToIndex(boxId);

        if (bearCollectedSerie[indexId].status == BearStatus.COLLECTED) {
            return "bear";
        } else {
            return "box";
        }
    }

    private _getBearDataPreview(bearsId: string[]): string[] {

        let dataList: string[] = [];

        let index = 0;
        bearsId.forEach(bearId => {
            let data = this._bearCollectedCompare(bearId, this._serieCollected)    
            dataList.push(data);
            
            console.log(`${bearId} = Key : ${this._serieCollected[index].id} - Value:  ${this._serieCollected[index].status} ~~ ${dataList[index]}`);
            index++;
        });

        console.log(dataList);

        return dataList;
    }
}