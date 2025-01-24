import { _decorator, Component, Node } from 'cc';
import { DafaultData } from '../data/DefaultData';
import { CharacterCollectedData } from '../data/CharacterCollectedData';
import { GameManager } from '../core/GameManager';
import { SerieView } from '../views/SerieView';
import { SaveLoad } from '../utils/SaveLoad';
import { StorageKey } from '../enum/StorageKey';
const { ccclass, property } = _decorator;

@ccclass('SerieRepository')
export class SerieRepository extends Component {

    @property([Node])
    private series: Node[] = [];

    public get seriesData(): Node[] {
        return this.series;
    }

    public set seriesData(value: Node[]) {
        this.series = value;
    }

    public get currentSerieView(): SerieView {
        // currectnSerieId จะเริ่มที่ 1 แต่ index ของ array จะเริ่มที่ 0
        return this.series[GameManager.instance.currentSerieId - 1].getComponent(SerieView);
    }

    // สำหรับแสดงข้อมูล Character Pack ที่กำลังเล่นค้างอยู่
    public loadCharacterPackIdPlayingSerie(): string[] {

        // ถ้ามี Chracter Pack ที่กำลังเล่นอยู่ ณ ปัจจุบัน
        if (GameManager.instance.currentCharacterPackId.length >= 0) {
            return GameManager.instance.currentCharacterPackId;
        }

        // ถ้าไม่มี ให้โหลดจาก Local Storage
        switch (GameManager.instance.currentSerieId) {
            case 3: {
                return DafaultData.characterPackIdPlayingSerie03;
            }
            default:
                return DafaultData.characterPackIdPlayingSerie03;
        }
    }

    public setupDefaultCharacterCollectData(): void {
        SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '1', DafaultData.characterCollectedSerie01);
        SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '2', DafaultData.characterCollectedSerie02);
        SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '3', DafaultData.characterCollectedSerie03);
        SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '4', DafaultData.characterCollectedSerie04);
        SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '5', DafaultData.characterCollectedSerie05);
        SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '6', DafaultData.characterCollectedSerie06);
        SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '7', DafaultData.characterCollectedSerie07);
        SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '8', DafaultData.characterCollectedSerie08);
        SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '9', DafaultData.characterCollectedSerie09);
        SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + '10', DafaultData.characterCollectedSerie10);
    }

    public loadCurrentCharacterCollectedSerie(serieId: number): CharacterCollectedData[] {
        // switch (GameManager.instance.currentSerieId) {
        //     case 1: {
        //         return DafaultData.characterCollectedSerie01;
        //     }
        //     case 2: {
        //         return DafaultData.characterCollectedSerie02;
        //     }
        //     case 3: {
        //         return DafaultData.characterCollectedSerie03;
        //     }
        //     case 4: {
        //         return DafaultData.characterCollectedSerie04;
        //     }
        //     case 5: {
        //         return DafaultData.characterCollectedSerie05;
        //     }
        //     case 6: {
        //         return DafaultData.characterCollectedSerie06;
        //     }
        //     case 7: {
        //         return DafaultData.characterCollectedSerie07;
        //     }
        //     case 8: {
        //         return DafaultData.characterCollectedSerie08;
        //     }
        //     case 9: {
        //         return DafaultData.characterCollectedSerie09;
        //     }
        //     case 10: {
        //         return DafaultData.characterCollectedSerie10;
        //     }
        //     default:
        //         return DafaultData.characterCollectedSerie01;
        // }
        return SaveLoad.ReadData(StorageKey.CHARACTER_COLLECTED_SERIE + serieId);
    }

}