/*tslint:disable*/

export interface UpdateRunRequest {
    loaded?: number;
    loading_date?: number;
    status?: string;
    invoice_photo?: string;
    loading_lat?: number;
    loading_lng?: number;
    unloading_lat?: number;
    unloading_lng?: number;
    comment?: string;
    unloaded?: number;
    unloading_date?: number;
    fileUpload?: { image: string, fileName: string };
}