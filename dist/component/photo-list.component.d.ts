/// <reference types="react" />
interface Props {
    isLoading?: boolean;
    photoList: Array<any>;
    onPhotoSelect: (photo: any) => void;
    loadMore: (page: number, query: string) => void;
}
declare function PhotoList({ isLoading, photoList, onPhotoSelect, loadMore }: Props): JSX.Element;
export default PhotoList;
