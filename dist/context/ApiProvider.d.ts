import React from 'react';
type ApiProviderProps = {
    url: string;
    clientUrl?: string;
    authUrl?: string;
    apiKey?: string;
    authCookie: string;
    children: React.ReactNode;
};
declare const ApiProvider: (props: ApiProviderProps) => any;
export default ApiProvider;
