import { ICoach } from "./coach";
import { IRoom } from "./room";
import { ISport } from "./sport";

export interface ISection {
    id: string,
    name: string,
    description: string,
    room: IRoom,
    sport: ISport,
    coach: ICoach
    image?: any
}