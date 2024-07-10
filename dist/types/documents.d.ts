export declare type UserType = {
    id?: number;
    username?: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    bio?: string;
    avatar?: {
        url: string;
    };
    num_followers?: number;
    num_following?: number;
    display_num_following?: string;
    display_num_followers?: string;
    token?: string;
    paid?: boolean;
    role?: string;
    team_id?: number;
    team_role?: string;
    image?: StorageType;
};
export declare type ImageContentType = 'jpg' | 'jpeg' | 'png' | 'gif' | 'bmp' | 'webp' | 'heic';
export declare type VideoContentType = 'mp4' | 'webm' | 'ogg' | 'mov' | 'm4v';
export declare type StorageType = {
    url: string;
    height?: number;
    width?: number;
    content_type?: string;
};
export declare type AttachmentType = {
    id: number;
    filename?: string;
    url: string;
    content_type: ImageContentType | VideoContentType;
    thumbnail_url?: string;
    height?: number;
    width?: number;
    key?: string;
    service_name?: 'aws' | 'cloudinary' | 's3';
    byte_size?: number;
    created_at?: string;
};
export declare type ImageType = AttachmentType & {
    content_type: ImageContentType;
};
export declare type VideoType = AttachmentType & {
    content_type: VideoContentType;
};
export declare type DocumentLinkType = {
    id: number;
    target_id: number;
    source_id: number;
    target: DocumentType;
    source: DocumentType;
    updated_at: string;
    created_at: string;
};
export declare type DocumentType = {
    id?: number;
    user_id?: number;
    user?: UserType;
    handle: string;
    title: string;
    description: string;
    image: ImageType;
    video: VideoType;
    data: Record<string, any>;
    locale?: string;
    tags?: string[];
    position?: number;
    published: boolean;
    content_type?: string;
    shopify_handle?: string;
    created_at: string;
    updated_at: string;
    document_links: DocumentLinkType[];
    links: DocumentType[];
};
