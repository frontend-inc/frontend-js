import React from 'react';
import { ResourceResponse } from '../types';
declare type UseDocumentsParams = {
    collection?: string;
};
declare type DocumentResponse = ResourceResponse & {
    handleDataChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    filterDocumentLinks: (document: any, contentType: string) => any;
    getDocumentValue: (document: any, field: any) => any;
    flattenDocument: (resource: any) => any;
    flattenDocuments: (resources: any) => any;
};
declare const useDocuments: (params: UseDocumentsParams) => DocumentResponse;
export default useDocuments;
