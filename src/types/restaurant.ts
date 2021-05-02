export interface IRestaurant {
    lat: string;
    lon: string;
    r: string;
    user_id: string;
}
export interface IRestaurantsResponseApi {
    results?: {
        next?: string;
        items?: IRestaurantItem[]
    }
}
interface ITagsItems{
    id?: string;
    title?: string;
    group?: string;
}
interface IStructureItems{
    start?: string;
    duration?: string;
    recurrence?: string;
}
export interface IRestaurantItem {
    position?: number[];
    distance?: number;
    title?: string;
    averageRating?: number;
    category?: {
        id?: string;
        title?: string;
        href?: string;
        type?: string;
        system?: string;
    };
    icon?: string;
    vicinity?: string;
    having?: [];
    type?: string;
    href?: string;
    tags?: ITagsItems[];
    id?: string;
    openingHours?: {
        text?: string;
        label?: string;
        isOpen?: boolean;
        structured?: IStructureItems[]
    };
}