import React from 'react';
type ResourceProviderProps = {
    url: string;
    foreignUrl?: string;
    name: string;
    resource?: any;
    children: React.ReactNode;
};
declare const ResourceProvider: (props: ResourceProviderProps) => any;
export default ResourceProvider;
