import { UUID } from "crypto";

export interface Workspace{
    id: string;
    name: string;
    description: string;
    companyId:String;
}
export interface Company{
    id: string;
    name: string;
    address: string;
}
export enum ProjectStatus {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    ON_HOLD = "ON_HOLD"
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    workspaceId: string;
    startDate: string;
    endDate: string;
}
