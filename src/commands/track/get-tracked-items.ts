import { getRedisClient } from "../../lib/redis";

const trackedItems = [
    {
        name: "Raw manta ray",
        id: 389,
        highTarget: 4000,
        lowTarget: null,
    },
    {
        name: "Diamond dragon bolts (e)",
        id: 21946,
        highTarget: 4400,
        lowTarget: null,
    },
];

export const getTrackedItems = async () => {
    try {
        const redis = await getRedisClient();
        return trackedItems;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
