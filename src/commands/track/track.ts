import { CommandInteraction, SlashCommandBuilder, AutocompleteInteraction } from "discord.js";
import itemData from "../../public/items-array.json";
import { getRedisClient } from "../../lib/redis";

export const data = new SlashCommandBuilder()
    .setName("track")
    .setDescription("Add an item to track")
    .addStringOption((option) =>
        option
            .setName("item")
            .setDescription("The item you want to track")
            .setRequired(true)
            .setAutocomplete(true),
    )
    .addIntegerOption((option) => option.setName("buy").setDescription("Buy price"))
    .addIntegerOption((option) => option.setName("sell").setDescription("Sell price"));

export async function execute(interaction: CommandInteraction) {
    try {
        const highTarget = (interaction.options.get("buy")?.value as number) || 0;
        const lowTarget = (interaction.options.get("sell")?.value as number) || 0;
        if (!highTarget && !lowTarget) {
            await interaction.reply("You need to enter a buy or sell price!");
            return;
        }
        const userId = interaction.user.id;
        const { id, name } = JSON.parse(interaction.options.get("item")?.value as string);
        const data = {
            id,
            name,
            highTarget,
            lowTarget,
        };

        const redis = await getRedisClient();
        await redis.HSET(userId, `${id}`, JSON.stringify(data));
        await interaction.reply(
            `${name} is now being tracked. You will be notified when it hits ${highTarget || lowTarget} gp.`,
        );
    } catch (e) {
        console.error(e);
    }
}

export async function autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();
    const filtered = itemData.filter((choice) =>
        choice.name.toLowerCase().startsWith(focusedValue.toLowerCase()),
    );
    await interaction.respond(
        filtered.slice(0, 10).map((choice) => ({
            name: choice.name,
            value: `{"name": "${choice.name}", "id": ${choice.id}}`,
        })),
    );
}
