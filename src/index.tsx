import UnsplashImagePickerModal from './component/picker-modal/picker-modal'
import UnSplashImagePicker from './component/picker/index'

/**
 * @description UnSplashImagePicker search image from Unsplash.
 * @param {string} unsplashAccessKey - The unsplash access key.
 * @param {boolean} active - Whether the image picker is active.
 * @param {string} initialPhotoSearchQuery - The initial search query.
 * @param {function} setActive - Function to set the image picker active.
 * @param {function} onPhotoSelect - Function to call when a photo is selected.
 */
export default UnsplashImagePickerModal
export { UnSplashImagePicker }
