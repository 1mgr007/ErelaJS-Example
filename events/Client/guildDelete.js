module.exports = async (client, guild) => {
	client.users.fetch("527452562857656352").then(user => {
        user.send(`🔔 Leaved: ${guild.name} (${guild.id}) - ${guild.members.cache.size} members`);
	})
}