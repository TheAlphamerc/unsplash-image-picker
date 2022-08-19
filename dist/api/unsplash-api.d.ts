declare const unsplashApi: (accessKey: string) => {
    photos: {
        get: (a: {
            photoId: string;
        }, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<import("unsplash-js/dist/methods/photos/types").Full>>;
        list: (a: import("unsplash-js/dist/types/request").PaginationParams | undefined, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<{
            results: import("unsplash-js/dist/methods/photos/types").Basic[];
            total: number;
        }>>;
        getStats: (a: {
            photoId: string;
        }, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<import("unsplash-js/dist/methods/photos/types").Stats>>;
        getRandom: (a: import("unsplash-js/dist/methods/photos").RandomParams | undefined, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<import("unsplash-js/dist/methods/photos/types").Random | import("unsplash-js/dist/methods/photos/types").Random[]>>;
        trackDownload: (a: {
            downloadLocation: string;
        }, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<{
            url: string;
        }>>;
    };
    users: {
        getPhotos: (a: {
            stats?: boolean | undefined;
        } & import("unsplash-js/dist/types/request").OrientationParam & {
            username: string;
        } & import("unsplash-js/dist/types/request").PaginationParams, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<{
            results: import("unsplash-js/dist/methods/photos/types").Basic[];
            total: number;
        }>>;
        getCollections: (a: {
            username: string;
        } & import("unsplash-js/dist/types/request").PaginationParams, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<{
            results: import("unsplash-js/dist/methods/collections/types").Basic[];
            total: number;
        }>>;
        getLikes: (a: import("unsplash-js/dist/types/request").OrientationParam & {
            username: string;
        } & import("unsplash-js/dist/types/request").PaginationParams, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<{
            results: import("unsplash-js/dist/methods/photos/types").Basic[];
            total: number;
        }>>;
        get: (a: {
            username: string;
        }, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<import("unsplash-js/dist/methods/users/types").Full>>;
    };
    search: {
        getCollections: (a: import("unsplash-js/dist/methods/search").SearchParams, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<import("unsplash-js/dist/methods/search/types/response").Collections>>;
        getPhotos: (a: {
            query: string;
        } & Pick<import("unsplash-js/dist/types/request").PaginationParams, "page" | "perPage"> & import("unsplash-js/dist/types/request").OrientationParam & {
            orderBy?: "relevant" | "latest" | undefined;
            color?: "black" | "blue" | "green" | "magenta" | "orange" | "purple" | "red" | "teal" | "white" | "yellow" | "black_and_white" | undefined;
            lang?: import("unsplash-js").Language | undefined;
            contentFilter?: "high" | "low" | undefined;
            collectionIds?: string[] | undefined;
        }, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<import("unsplash-js/dist/methods/search/types/response").Photos>>;
        getUsers: (a: import("unsplash-js/dist/methods/search").SearchParams, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<import("unsplash-js/dist/methods/search/types/response").Users>>;
    };
    collections: {
        getPhotos: (a: {
            collectionId: string;
        } & import("unsplash-js/dist/types/request").PaginationParams & import("unsplash-js/dist/types/request").OrientationParam, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<{
            results: any[];
            total: number;
        }>>;
        get: (a: {
            collectionId: string;
        }, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<any>>;
        list: (a: Pick<import("unsplash-js/dist/types/request").PaginationParams, "page" | "perPage"> | undefined, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<{
            results: any[];
            total: number;
        }>>;
        getRelated: (a: {
            collectionId: string;
        }, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<any>>;
    };
    topics: {
        list: (a: Pick<import("unsplash-js/dist/types/request").PaginationParams, "page" | "perPage"> & {
            orderBy?: "latest" | "featured" | "oldest" | "position" | undefined;
            topicIdsOrSlugs?: string[] | undefined;
        }, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<{
            results: import("unsplash-js/dist/methods/topics/types").Basic[];
            total: number;
        }>>;
        get: (a: {
            topicIdOrSlug: string;
        }, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<import("unsplash-js/dist/methods/topics/types").Full>>;
        getPhotos: (a: {
            topicIdOrSlug: string;
        } & import("unsplash-js/dist/types/request").PaginationParams & import("unsplash-js/dist/types/request").OrientationParam, additionalFetchOptions?: import("unsplash-js/dist/helpers/request").AdditionalFetchOptions | undefined) => Promise<import("unsplash-js/dist/helpers/response").ApiResponse<{
            results: import("unsplash-js/dist/methods/photos/types").Basic[];
            total: number;
        }>>;
    };
};
export default unsplashApi;
