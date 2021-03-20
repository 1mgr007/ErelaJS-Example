const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "skipto",
	aliases: ["jump"],
	category: "Music",
	description: "Forward song",
	args: true,
    usage: "<Number of song in queue>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	execute(message, args) {

		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
            return message.channel.send(thing);
        }

        const position = Number(args[0]);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`Usage: ${message.client.prefix}volume <Number of song in queue>`)
            return message.channel.send(thing);
		}

        player.queue.remove(0, position - 1);
        player.stop();
		
		const emojijump = message.client.emoji.jump;

		let thing = new MessageEmbed()
			.setDescription(`${emojijump} Forward **${position}** Songs`)
			.setColor(message.client.embedColor)
			.setTimestamp()
			.setFooter(`Request by: ${message.author.tag}`, message.author.displayAvatarURL());
		return message.channel.send(thing);
	
    }
};
