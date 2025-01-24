import { CharacterStatus } from "../enum/CharacterStatus"

export interface CharacterCollectedData {
    readonly id: string,
    status: CharacterStatus
}