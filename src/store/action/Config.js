import { configAddStatus, configUploadStatus } from "../Type";

export function addStatus(label, value) {
    return {
        type: configAddStatus,
        payload: { label, value }
    }
}

export function uploadStatus(label, value){
    return {
        type: configUploadStatus,
        payload: { label, value }
    }
}