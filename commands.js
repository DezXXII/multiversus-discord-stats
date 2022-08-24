const { prefix } = require('./config.json');

module.exports = (client, aliases, callback) => {
    if (typeof aliases === 'string') {
        aliases = [aliases];
    }

    client.on('message', message => {
        const content = message.content.toLowerCase();
        
        aliases.forEach(alias => {
            let aliasLower = alias.toLowerCase();
            const command = `${prefix}${aliasLower}`

            if (content.startsWith(`${command} `) || content === command) {
                console.log(`Running the command ${command}`)
                callback(message)
            }
        })
    })
}