import { CharacterStatus } from '../enum/CharacterStatus';
import { SerieStatus } from '../enum/SerieStatus';
import { SerieData } from './SerieData';
import { CharacterCollectedData } from './CharacterCollectedData';

export class DafaultData {

    public static serieCollected: SerieData[] = [
        { serieId: 1, status: SerieStatus.PROGRESS },
        { serieId: 2, status: SerieStatus.PROGRESS },
        { serieId: 3, status: SerieStatus.PROGRESS },
        { serieId: 4, status: SerieStatus.PROGRESS },
        { serieId: 5, status: SerieStatus.PROGRESS },
        { serieId: 6, status: SerieStatus.PROGRESS },
        { serieId: 7, status: SerieStatus.PROGRESS },
        { serieId: 8, status: SerieStatus.PROGRESS },
        { serieId: 9, status: SerieStatus.PROGRESS },
        { serieId: 10, status: SerieStatus.PROGRESS },
    ]

    public static characterPackIdPlayingSerie03: string[] = [
        "G", "F", "C", "D", "B", "E"
    ]

    public static characterCollectedSerie01: CharacterCollectedData[] = [
        { id: "A", status: CharacterStatus.COLLECTED },
        { id: "B", status: CharacterStatus.BOX },
        { id: "C", status: CharacterStatus.BOX },
        { id: "D", status: CharacterStatus.COLLECTED },
        { id: "E", status: CharacterStatus.COLLECTED },
        { id: "F", status: CharacterStatus.COLLECTED },
        { id: "G", status: CharacterStatus.BOX }
    ]

    public static characterCollectedSerie02: CharacterCollectedData[] =
        [
            { id: "A", status: CharacterStatus.COLLECTED },
            { id: "B", status: CharacterStatus.COLLECTED },
            { id: "C", status: CharacterStatus.BOX },
            { id: "D", status: CharacterStatus.COLLECTED },
            { id: "E", status: CharacterStatus.COLLECTED },
            { id: "F", status: CharacterStatus.COLLECTED },
            { id: "G", status: CharacterStatus.COLLECTED }
        ]

    public static characterCollectedSerie03: CharacterCollectedData[] =
        [
            { id: "A", status: CharacterStatus.COLLECTED },
            { id: "B", status: CharacterStatus.BOX },
            { id: "C", status: CharacterStatus.COLLECTED },
            { id: "D", status: CharacterStatus.COLLECTED },
            { id: "E", status: CharacterStatus.COLLECTED },
            { id: "F", status: CharacterStatus.COLLECTED },
            { id: "G", status: CharacterStatus.BOX }
        ]

    public static characterCollectedSerie04: CharacterCollectedData[] =
        [
            { id: "A", status: CharacterStatus.COLLECTED },
            { id: "B", status: CharacterStatus.COLLECTED },
            { id: "C", status: CharacterStatus.BOX },
            { id: "D", status: CharacterStatus.COLLECTED },
            { id: "E", status: CharacterStatus.COLLECTED },
            { id: "F", status: CharacterStatus.BOX },
            { id: "G", status: CharacterStatus.COLLECTED }
        ]

    public static characterCollectedSerie05: CharacterCollectedData[] =
        [
            { id: "A", status: CharacterStatus.COLLECTED },
            { id: "F", status: CharacterStatus.BOX },
            { id: "B", status: CharacterStatus.COLLECTED },
            { id: "G", status: CharacterStatus.COLLECTED },
            { id: "E", status: CharacterStatus.COLLECTED },
            { id: "D", status: CharacterStatus.COLLECTED },
            { id: "C", status: CharacterStatus.BOX },
        ]

    public static characterCollectedSerie06: CharacterCollectedData[] =
        [
            { id: "A", status: CharacterStatus.COLLECTED },
            { id: "F", status: CharacterStatus.COLLECTED },
            { id: "B", status: CharacterStatus.BOX },
            { id: "G", status: CharacterStatus.BOX },
            { id: "E", status: CharacterStatus.COLLECTED },
            { id: "D", status: CharacterStatus.BOX },
            { id: "C", status: CharacterStatus.COLLECTED },
        ]

    public static characterCollectedSerie07: CharacterCollectedData[] =
        [
            { id: "A", status: CharacterStatus.COLLECTED },
            { id: "F", status: CharacterStatus.BOX },
            { id: "B", status: CharacterStatus.COLLECTED },
            { id: "G", status: CharacterStatus.BOX },
            { id: "E", status: CharacterStatus.COLLECTED },
            { id: "D", status: CharacterStatus.COLLECTED },
            { id: "C", status: CharacterStatus.BOX },
        ]

    public static characterCollectedSerie08: CharacterCollectedData[] =
        [
            { id: "A", status: CharacterStatus.COLLECTED },
            { id: "F", status: CharacterStatus.COLLECTED },
            { id: "B", status: CharacterStatus.BOX },
            { id: "G", status: CharacterStatus.COLLECTED },
            { id: "E", status: CharacterStatus.BOX },
            { id: "D", status: CharacterStatus.COLLECTED },
            { id: "C", status: CharacterStatus.COLLECTED },
        ]

    public static characterCollectedSerie09: CharacterCollectedData[] =
        [
            { id: "A", status: CharacterStatus.COLLECTED },
            { id: "F", status: CharacterStatus.COLLECTED },
            { id: "B", status: CharacterStatus.BOX },
            { id: "G", status: CharacterStatus.BOX },
            { id: "E", status: CharacterStatus.COLLECTED },
            { id: "D", status: CharacterStatus.COLLECTED },
            { id: "C", status: CharacterStatus.BOX },
        ]

    public static characterCollectedSerie10: CharacterCollectedData[] =
        [
            { id: "A", status: CharacterStatus.COLLECTED },
            { id: "F", status: CharacterStatus.COLLECTED },
            { id: "B", status: CharacterStatus.BOX },
            { id: "G", status: CharacterStatus.BOX },
            { id: "E", status: CharacterStatus.COLLECTED },
            { id: "D", status: CharacterStatus.BOX },
            { id: "C", status: CharacterStatus.COLLECTED },
        ]

    public static userData = {
        name: "UserTest",
        coin: 100,
        registerDate: 0
    }

}