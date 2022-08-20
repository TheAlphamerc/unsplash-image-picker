/// <reference types="react" />
interface Props {
    unsplashAccessKey: any;
    active?: boolean;
    modalWidth?: number;
    modalClassName?: string;
    initialPhotoSearchQuery?: string;
    setActive?: (active: boolean) => void;
    onPhotoSelect?: (photo: any) => void;
}
/**
 * @description ImagePickerModal search image from Unsplash.
 * @param {string} unsplashAccessKey - The unsplash access key.
 * @param {string} initialPhotoSearchQuery - The initial search query.
 * @param {boolean} active - Whether the image picker is active.
 * @param {function} setActive - Function to set the image picker active.
 * @param {function} onPhotoSelect - Function to call when a photo is selected.
 * @param {number} modalWidth - The width of the modal. Default is 840px.
 * @param {string} modalClassName - The classname for the modal.
 */
export default function ImagePickerModal({ unsplashAccessKey, active, initialPhotoSearchQuery, setActive, onPhotoSelect, modalWidth, modalClassName }: Props): JSX.Element | null;
export {};
