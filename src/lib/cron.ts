import cron from "node-cron";
import { trackItems } from "../commands/track/track-cronjob";

export const createCronJob = () => {
    try {
        const task = cron.createTask(
            "30 * * * * *",
            async () => {
                try {
                    const data = await trackItems();
                    console.log(data);
                } catch (error) {
                    console.error("Error in cron job:", error);
                }
            },
            {
                name: "latest_items",
            },
        );

        return task;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
