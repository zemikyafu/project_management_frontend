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