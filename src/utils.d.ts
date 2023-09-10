import {MessageData} from "./types";

export function getElementValue(className: string ): string {
    const element: any = document.querySelector(className);
    return element.value;
}

export function parseJsonString (jsonString: string): MessageData {
    return JSON.parse(jsonString);
}