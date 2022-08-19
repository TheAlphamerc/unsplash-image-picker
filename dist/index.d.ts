/// <reference types="react" />
interface Props {
    unsplashAccessKey: string;
    active?: boolean;
    initialPhotoSearchQuery?: string;
    setActive?: (active: boolean) => void;
}
export declare const UnsplashImagePicker: ({ unsplashAccessKey, active, initialPhotoSearchQuery, setActive }: Props) => JSX.Element;
export {};
