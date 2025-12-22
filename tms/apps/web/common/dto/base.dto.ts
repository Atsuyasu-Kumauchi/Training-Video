export interface IBaseDto {
    created: string;
    modified: string;
    deletedAt: Date | null;
}

export abstract class BaseDto implements IBaseDto {
    created: string = "";
    modified: string = "";
    deletedAt: Date | null = null;

    abstract setAdditionalKey(): void;
}
