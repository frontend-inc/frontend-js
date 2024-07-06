import React from 'react';
import { ResourceResponse } from '../types';
declare type DocumentResponse = ResourceResponse & {
    handleDataChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    filterDocumentLinks: (document: any, contentType: string) => any;
    getDocumentValue: (document: any, field: any) => any;
    flattenDocument: (resource: any) => any;
    flattenDocuments: (resources: any) => any;
};
declare const useDocuments: () => DocumentResponse;
export default useDocuments;
