import React from 'react';
declare type QueryPropsType = {
    url: string;
    handle: string | string[];
    ready?: boolean;
    query?: any;
    children: React.ReactNode | React.ReactNode[];
};
declare const Query: React.FC<QueryPropsType>;
export default Query;
