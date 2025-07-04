import { CommandInteraction, SlashCommandBuilder, AutocompleteInteraction } from "discord.js";
import itemData from "../../public/items-array.json";

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
        const itemName = interaction.options.get("item")?.value;
        const buyPrice = interaction.options.get("buy");
        const sellPrice = interaction.options.get("sell");
        if (!buyPrice && !sellPrice) {
            await interaction.reply("You need to enter a buy or sell price!");
            return;
        }

        await interaction.reply(
            `${itemName} is now being tracked. You will be notified when it hits ${buyPrice?.value || sellPrice?.value}gp.`,
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
        filtered.slice(0, 10).map((choice) => ({ name: choice.name, value: `${choice.name}` })),
    );
}
