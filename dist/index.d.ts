/// <reference types="react" />
interface Props {
    unsplashAccessKey: string;
    active?: boolean;
    setActive?: (active: boolean) => void;
}
export declare const UnsplashImagePicker: ({ unsplashAccessKey, active, setActive }: Props) => JSX.Element;
export {};
