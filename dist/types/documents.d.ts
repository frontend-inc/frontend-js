export type SyntheticEventType = any & {
    target: {
        name: string;
        value: any;
    };
};
export type UserType = {
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
    password?: string | undefined;
    password_confirmation?: string | undefined;
};
export type ImageContentType = 'jpg' | 'jpeg' | 'png' | 'gif' | 'bmp' | 'webp' | 'heic';
export type VideoContentType = 'mp4' | 'webm' | 'ogg' | 'mov' | 'm4v';
export type StorageType = {
    url: string;
    height?: number;
    width?: number;
    content_type?: string;
};
export type AttachmentType = {
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
export type ImageType = AttachmentType & {
    content_type: ImageContentType;
};
export type VideoType = AttachmentType & {
    content_type: VideoContentType;
};
export type ReferenceType = {
    id: number;
    target_id: number;
    source_id: number;
    target: DocumentType;
    source: DocumentType;
    updated_at: string;
    created_at: string;
};
export type DocumentType = {
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
    document_links: ReferenceType[];
    links: DocumentType[];
};
