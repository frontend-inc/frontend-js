import React from 'react';
declare type QueryProps = {
    url: string;
    handle: string | string[];
    ready?: boolean;
    query?: any;
    children: React.ReactNode | React.ReactNode[];
};
declare const Query: React.FC<QueryProps>;
export default Query;
