interface ISelectConvertProps {
    label: string;
    value: string;
}
export function selectConvert<T>(data: T[], { label, value }: ISelectConvertProps) {
    const options = data.map((item) => ({
        label: item[label as keyof T],
        value: item[value as keyof T] as string,
    }));
    return options as ISelectConvertProps[];
};