import { configAddStatusType, configUploadStatusType } from "../Type";

export function addStatusAction(label, value) {
    return {
        type: configAddStatusType,
        payload: { label, value }
    }
}

export function uploadStatusAction(label, value) {
    return {
        type: configUploadStatusType,
        payload: { label, value }
    }
}