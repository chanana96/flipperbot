import { getRedisClient } from "../../lib/redis";

export const getTrackedItems = async () => {
    try {
        const redis = await getRedisClient();
        const itemData = await redis.HGETALL("103826386174644224");
        const trackedItems = Object.keys(itemData).map((key) => JSON.parse(itemData[key]));
        return trackedItems;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
