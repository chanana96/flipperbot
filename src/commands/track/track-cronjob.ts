import { getItems } from "../../lib/get-items";
import { getTrackedItems } from "./get-tracked-items";

export const trackItems = async () => {
    try {
        const response = await getItems();
        const trackedItems = await getTrackedItems();
        const items = await checkTrackedItems({ trackedItems, response });
        return items;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const getCurrentPriceForTrackedItems = async ({ trackedItems, response }) => {
    try {
        const items = trackedItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: response.get(item.id),
        }));
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const checkTrackedItems = async ({ trackedItems, response }) => {
    try {
        const filteredItems = trackedItems.filter((item) => {
            const isHighTarget = item.highTarget !== null;
            const isLowTarget = item.lowTarget !== null;

            if (isHighTarget && response.get(item.id).high >= item.highTarget!) {
                return true;
            }

            if (isLowTarget && response.get(item.id).low <= item.lowTarget!) {
                return true;
            }

            return false;
        });
        return filteredItems;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
