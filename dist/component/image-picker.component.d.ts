/// <reference types="react" />
interface Props {
    unsplash: any;
    active?: boolean;
    initialPhotoSearchQuery?: string;
    setActive?: (active: boolean) => void;
    onPhotoSelect?: (photo: any) => void;
}
/**
 * @description ImagePicker search image from Unsplash.
 * @param {string} initialPhotoSearchQuery - The initial search query.
 * @param {boolean} active - Whether the image picker is active.
 * @param {function} setActive - Function to set the image picker active.
 * @param {function} onPhotoSelect - Function to call when a photo is selected.
 */
export default function ImagePicker({ unsplash, active, initialPhotoSearchQuery, setActive, onPhotoSelect }: Props): JSX.Element | null;
export {};
