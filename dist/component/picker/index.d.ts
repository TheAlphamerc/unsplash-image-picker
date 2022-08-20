/// <reference types="react" />
interface Props {
    unsplashAccessKey: string;
    initialPhotoSearchQuery?: string;
    onPhotoSelect?: (photo: any) => void;
}
/**
 * @description ImagePicker search image from Unsplash.
 * @param {string} unsplashAccessKey - The unsplash access key.
 * @param {string} initialPhotoSearchQuery - The initial search query.
 * @param {function} onPhotoSelect - Function to call when a photo is selected.
 */
export default function ImagePicker({ unsplashAccessKey, initialPhotoSearchQuery, onPhotoSelect }: Props): JSX.Element;
export {};
