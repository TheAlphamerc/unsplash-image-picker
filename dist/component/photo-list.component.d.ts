/// <reference types="react" />
interface Props {
    isLoading?: boolean;
    isLoadingMore?: boolean;
    photoList: Array<any>;
    total?: number | undefined;
    onPhotoSelect: (photo: any) => void;
    loadMore: () => void;
}
declare function PhotoList({ isLoading, isLoadingMore, photoList, total, onPhotoSelect, loadMore }: Props): JSX.Element;
export default PhotoList;
