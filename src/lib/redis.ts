import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType | null = null;

export const getRedisClient = async (): Promise<RedisClientType> => {
    if (!redisClient) {
        redisClient = createClient();
        redisClient.on("error", (err) => console.log("Redis Client Error", err));
        await redisClient.connect();
    }
    return redisClient;
};
