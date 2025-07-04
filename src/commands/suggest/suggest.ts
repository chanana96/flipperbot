import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getItems } from "../../lib/get-items";
import path from "path";

export const data = new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggest a profitable item to flip");

export async function execute(interaction: CommandInteraction) {
    try {
        const response = await getItems();
        console.log(response);
        // await interaction.deferReply();
        // return interaction.editReply("data");
    } catch (e) {
        console.error(e);
    }
}
