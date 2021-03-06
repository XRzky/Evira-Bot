const { Permissions } = require('discord.js');

module.exports = class Command {

	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.description = options.description || 'No description provided.';
		this.category = options.category || 'Miscellaneous';
		this.usage = options.usage || '';
		this.memberPerms = new Permissions(options.memberPerms).freeze();
		this.clientPerms = new Permissions(options.clientPerms).freeze();
		this.cooldown = options.cooldown || 0;
		this.isNsfw = options.nsfw || false;
		this.isOwner = options.ownerOnly || false;
		this.isDisabled = options.disabled || false;
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}

};
