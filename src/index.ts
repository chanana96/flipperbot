import { DISCORD } from "./config/config";
import { Client, Collection } from "discord.js";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";
import { ClientWithCommands } from "./types/discord-types";
import { createCronJob } from "./lib/cron";
import { getRedisClient } from "./lib/redis";

const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
}) as ClientWithCommands;

client.commands = new Collection();
Object.entries(commands).forEach(([name, command]) => {
    client.commands.set(name, command);
});

client.once("ready", async () => {
    await deployCommands({ guildId: DISCORD.GUILD_ID });
    const redisClient = await getRedisClient();
    const task = createCronJob();
    task.start();

    console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command || !command.execute) {
            console.error(`No execute handler for command ${interaction.commandName}.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
        }
    } else if (interaction.isAutocomplete()) {
        const command = client.commands.get(interaction.commandName);

        if (!command || !command.autocomplete) {
            console.error(`No autocomplete handler for command ${interaction.commandName}.`);
            return;
        }

        try {
            await command.autocomplete(interaction);
        } catch (error) {
            console.error(error);
        }
    }
});
client.login(DISCORD.TOKEN);
