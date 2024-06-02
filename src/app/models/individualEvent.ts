import { ICoach } from "./coach";
import { IRoom } from "./room";
import { ISport } from "./sport";

export interface IIndividualEvent {
    id: string,
    startTime: Date,
    endTime: Date,
    coach: ICoach,
    sport: ISport,
    room: IRoom,
    clientId?: string
}