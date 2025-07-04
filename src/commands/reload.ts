import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ClientWithCommands } from "../types/discord-types";

export const data = new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads a command.")
    .addStringOption((option) =>
        option.setName("command").setDescription("The command to reload.").setRequired(true),
    );

export async function execute(interaction: CommandInteraction) {
    const commandName = (interaction.options.data[0].value as string).toLowerCase();

    const client = interaction.client as ClientWithCommands;
    const command = client.commands.get(commandName);

    if (!command) {
        return interaction.reply(`There is no command with name \`${commandName}\`!`);
    }

    delete require.cache[require.resolve(`./${command.data.name}/${command.data.name}.ts`)];

    try {
        const newCommand = require(`./${command.data.name}/${command.data.name}.ts`);
        //@ts-ignore
        interaction.client.commands.set(newCommand.data.name, newCommand);
        await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
    } catch (error) {
        console.error(error);
        await interaction.reply(
            `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``,
        );
    }
}
