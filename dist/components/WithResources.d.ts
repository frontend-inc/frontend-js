import React from 'react';
export type WithResourcesProps = {
    render: (resources: any, rest: any) => React.ReactNode;
};
declare const WithResources: React.FC<WithResourcesProps>;
export default WithResources;
