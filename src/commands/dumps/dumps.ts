import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getItems } from "../../lib/get-items";
import path from "path";

export const data = new SlashCommandBuilder()
    .setName("dumps")
    .setDescription("Scan for dumped items");

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
