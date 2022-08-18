/// <reference types="react" />
interface Props {
    unsplash: any;
    active?: boolean;
    setActive?: (active: boolean) => void;
}
export default function UnsplashImagePickerComponent({ unsplash, active, setActive }: Props): JSX.Element;
export {};
