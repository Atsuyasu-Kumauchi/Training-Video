export interface IBaseDto {
    id: string;
    version: number;
    createdAt: string;
    updatedAt: string;
    createdByUser?: string;
    updatedByUser?: string;

    active: boolean | null;
    deleted: boolean;
}

export abstract class BaseDto implements IBaseDto {
    id: string = "";
    version: number = 0;
    createdAt: string = "";
    updatedAt: string = "";
    createdByUser?: string;
    updatedByUser?: string;

    active: boolean | null = null;
    deleted: boolean = false;

    abstract setAdditionalKey(): void;
}
