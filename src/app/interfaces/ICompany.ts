import { Timestamp } from "firebase/firestore";

export interface ICompany {
    cnpj: string;
    social_name: string;
    isActive?: boolean;
    acronym?: string;
    personas?: Array<String>;
    size: string;
    owner?: string;
    createAt?: Date;
    updatedAt?: Date;
}