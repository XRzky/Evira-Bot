const Event = require('../../Structures/Event.js');
const { MessageEmbed, WebhookClient } = require('discord.js');
const { Access, Color } = require('../../Utils/Configuration.js');
const webhook = new WebhookClient(Access.WEBHOOK_ID, Access.WEBHOOK_TOKEN);

module.exports = class extends Event {

	async run(guild) {
		if (!guild.available) return;
		const guildOwner = await guild.fetchOwner();

		const embed = new MessageEmbed()
			.setColor(Color.RED)
			.setTitle(`${this.client.user.username} left a Server!`)
			.setThumbnail(guild.iconURL() ? guild.iconURL({ dynamic: true, size: 512 }) : `https://guild-default-icon.herokuapp.com/${encodeURIComponent(guild.nameAcronym)}`)
			.setDescription([
				`***Server:*** ${guild.name} (\`${guild.id}\`)`,
				`***Owner:*** ${guildOwner.user.tag} (\`${guildOwner.id}\`)`
			].join('\n'))
			.setFooter(`${this.client.guilds.cache.size.formatNumber()} guilds | ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).formatNumber()} users`, this.client.user.avatarURL({ dynamic: true }));

		return webhook.send({ username: this.client.user.username, avatarURL: this.client.user.displayAvatarURL({ dynamic: true }), embeds: [embed] });
	}

};
