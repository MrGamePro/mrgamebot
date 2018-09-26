const Discord = require("discord.js")
const bot = new Discord.Client()

var prefix = "-"

bot.login("NDkzNDM5MjY0NjkzMDI2ODM0.Dok_DQ.9lNwcgy1dse1e41Q1tef95y8JpU")

bot.on("ready", function (ready) {
    bot.user.setGame(prefix + "help | " + bot.users.size + " utilisateurs")
    console.log("Ready to hear !")
})

bot.on("message", function (message) {

    if (message.author.bot) return;
    
Â  Â  //help
    if(message.content === prefix + "help") {
        let helpEmbed = new Discord.RichEmbed()
            .setDescription("Help")
            .setColor("#3cadea")
            .addField("Informations", "â€¢ `-help` : envoie la page d'aide \nâ€¢ `-serverinfo` : donne des informations Ã  propos du serveur \nâ€¢ `-userinfo` : donne des informations Ã  propos d'un utilisateur")
            .addField("UtilitÃ©", "â€¢ `-ping` : ping du bot \nâ€¢ `-say` : fait envoyer un message au bot \nâ€¢ `-devs` : personnes ayant dÃ©veloppÃ© le bot")
            .addField("ModÃ©ration", "â€¢ `-jeu` : met Ã  jour le jeu du bot \nâ€¢ `-mp` : envoie un message en privÃ© Ã  la personne mentionnÃ©e \nâ€¢ `-mute` : rend muet un utilisateur \nâ€¢ `-kick` : expulse un utilisateur \nâ€¢ `-ban` : expulse dÃ©finitivement un utilisateur")
            .setFooter("By YZBLOW#4762")
            .setTimestamp()
        message.channel.send(helpEmbed)
        console.log("Commande d'aide par " + message.author.tag)
    }

Â    //ping
    if(message.content === prefix + "ping") {
        let pingEmbed = new Discord.RichEmbed()
            .setColor("#3cadea")
            .addField("Ping du bot : ", `${message.createdTimestamp - Date.now()}` + " ms")
        message.channel.send(pingEmbed)
    }

Â    //mute
    if(message.content.startsWith(prefix + "mute")) {
        let muteuser = message.mentions.users.first()
        let mutereason = message.content.slice("28")
        let muterole = message.guild.roles.find("name", "Silencieux")
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("Permissions insuffisantes.")
        if(!muteuser) return message.channel.send("Merci d'Ã©crire la commande comme suit (sans les < >) : \n-mute <membre Ã  mentionner> <raison>")
        if(!mutereason) {
            mutereason = "pas de raison donnÃ©e."
        }
        if(muteuser === message.author) return message.reply("Vous ne pouvez pas vous mute vous mÃªme !")
        if(!muterole) return message.reply("Aucun rÃ´le `Silencieux` n'a Ã©tÃ© trouvÃ©.")
        if(message.guild.member(muteuser).hasPermission("MANAGE_MESSAGES")) return message.reply("Cet utilisateur a Ã©galement la permission de mute. Il ne peut donc Ãªtre rendu muet.")

Â  Â  Â  Â  message.channel.send("**" + muteuser + " a bien Ã©tÃ© rendu muet !**")
        muteuser.send("Vous venez d'Ãªtre rendu muet sur **" + message.guild.name + "** pour la raison de : " + mutereason)
        message.guild.member(muteuser).addRole(muterole)
    }

Â    //unmute
    if(message.content.startsWith(prefix + "unmute")) {
        let unmuteuser = message.mentions.users.first()
        let muterole = message.guild.roles.find("name", "Silencieux")
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("Permissions insuffisantes.")
        if(!unmuteuser) return message.reply("Utilisateur non trouvÃ© !")

Â  Â  Â    message.channel.send("**" + unmuteuser + " a bien Ã©tÃ© unmute !")
        message.guild.member(unmuteuser).removeRole(muterole)
    }
    
    //serverinfo
    if (message.content === prefix + 'serverinfo') {
        let siembed = new Discord.RichEmbed()
            .setDescription("â„¹ Informations serveur")
            .setColor("#3cadea")
            .setThumbnail(message.guild.iconURL)
            .addField("Nom", message.guild.name)
            .addField("ID", message.guild.id)
            .addField("Nombre de membres", message.guild.members.size)
	           .addField("Owner", message.guild.owner)
            .addField("Channels", message.guild.channels.size)
            .addField("Roles", message.guild.roles.size)
	           .setFooter("By YZBLOW#4762")
            .setTimestamp()
        message.channel.send(siembed)
    }

    //userinfo
    if (message.content.startsWith(prefix + "userinfo")) {
        let userinfo = message.mentions.users.first()
        if (!userinfo) {
            userinfo = message.author
        }
        let poste = "Simple membre"
        if (message.guild.member(userinfo).hasPermission("MANAGE_MESSAGES")) {
            poste = "ModÃ©rateur"
        }
        let botuser = "Non"
        if (userinfo.bot) {
            botuser = "Oui"
        }
        let userEmbed = new Discord.RichEmbed()
            .setDescription("â„¹ Informations utilisateur")
            .setColor("#3cadea")
            .addField("User", userinfo)
            .addField("ID", userinfo.id)
            .addField("Date de crÃ©ation du compte", userinfo.createdAt)
            .addField("Poste", poste)
            .setFooter("By YZBLOW#4762")
            .setTimestamp()
        message.channel.send(userEmbed)
    }
    
    if (message.content.startsWith(prefix + "say")) {
        message.delete()
        let text = message.content.slice("5")
        if (!text) return message.reply("Texte non dÃ©fini !")
        if (message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(text)
        if (text.includes("discord.gg")) return message.reply("Les liens sont interdits ici.")
        message.channel.send(text)
    }
    
    if (message.content === prefix + "devs") {
        let devsEmbed = new Discord.RichEmbed()
            .setDescription("DÃ©veloppeurs")
            .setColor("#3cadea")
            .addField("Chef de projet", "<@318316245265154048>")
            .addField("DÃ©veloppeur", "<@374997960557199370>")
            .addField("Producteurs", "Applications Maker : https://discord.gg/nXHxvUf")
        message.channel.send(devsEmbed)
    }
    
    //mp
    if (message.content.startsWith(prefix + "mp")) {
        let usermp = message.mentions.users.first()
        let msgsend = message.content.slice("26")
        if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("Permissions insuffisantes.")
        if (!usermp) return message.reply("Utilisateur non trouvÃ© !")
        if (!msgsend) return message.reply("Message non prÃ©cisÃ© !")
        message.reply("Votre message a bien Ã©tÃ© envoyÃ© Ã  **" + usermp.tag + "**")
        usermp.send(msgsend)
    }
    
    //kick 
    if(message.content.startsWith(prefix + "kick")) { 	
        message.delete() 	
        let kickuser = message.mentions.users.first() 
        let kickreason = message.content.slice("28") 
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("Permissions insuffisantes.") 	
        if(!kickuser) return message.reply("Utilisateur non trouvÃ© !") 	
        if(!kickreason) { 		
        	    kickreason = "pas de raison donnÃ©e" 	
        	} 
        	
        	message.channel.send(kickuser + " a bien Ã©tÃ© expulsÃ© !") 	
        	kickuser.send("Vus avez Ã©tÃ© expulsÃ© de " + message.guild.name + " pour la raison suivante : " + kickreason) 
        	message.guild.member(kickuser).kick(kickreason) 
    } 
    
    //ban 
    if(message.content.startsWith(prefix + "ban")) { 	
         message.delete() 	
    	    let banuser = message.mentions.users.first() 	
    	    let banreason = message.content.slice("27") 	
    	    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("Permissions insuffisantes.") 	
         if(!banuser) return message.reply("Utilisateur non trouvÃ© !") 	
    	    if(!banuser) { 		
    	        banuser = "pas de raison donnÃ©e" 	
    	    } 	
    	    message.channel.send(banuser + " a bien Ã©tÃ© banni !") 	
    	    banuser.send("Vus avez Ã©tÃ© banni de " + message.guild.name + " pour la raison suivante : " + banreason) 	
    	    message.guild.member(banuser).kick(banreason) 
     }
     
     if (message.content.startsWith(prefix + "jeu")) {
         let jeu = message.content.slice("5")
         if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("Permissions insuffisantes.")
         if (!jeu) return message.reply("Jeu non prÃ©cisÃ© !")
         bot.user.setGame(jeu)
         message.channel.send("Jeu changÃ© Ã  : " + jeu)
     }
})
