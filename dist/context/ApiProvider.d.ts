import React from 'react';
declare type ApiProviderProps = {
    url: string;
    clientUrl?: string;
    apiKey?: string;
    authCookie: string;
    children: React.ReactNode;
};
declare const ApiProvider: (props: ApiProviderProps) => any;
export default ApiProvider;
