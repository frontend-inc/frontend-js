import React from 'react';
export type WithResourceProps = {
    render: (resource: any, rest: any) => React.ReactNode;
};
declare const WithResource: React.FC<WithResourceProps>;
export default WithResource;
