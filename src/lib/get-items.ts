import { api } from "../config/axios";

export type LatestItemData = {
    high: number;
    highTime: number;
    low: number;
    lowTime: number;
};

export const getItems = async () => {
    try {
        const response = (await api.get("latest")).data;
        const pricesMap = new Map<number, LatestItemData>();

        for (const [itemIdStr, priceData] of Object.entries(response.data)) {
            const itemId = parseInt(itemIdStr, 10);
            pricesMap.set(itemId, priceData as LatestItemData);
        }
        return pricesMap;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
