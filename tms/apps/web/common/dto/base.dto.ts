export interface IBaseDto {
    created: string;
    modified: string;
}

export abstract class BaseDto implements IBaseDto {
    created: string = "";
    modified: string = "";

    abstract setAdditionalKey(): void;
}
