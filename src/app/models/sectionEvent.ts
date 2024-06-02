import { ISection } from "./section";

export interface ISectionEvent {
    id: string,
    dayOfWeek: any,
    startTime: any,
    endTime: any,
    period: any,
    section: ISection
}