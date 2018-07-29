const {Client, RichEmbed} = require('discord.js');
const client = new Client({
	disableEveryone : true
});
const ytdl = require('ytdl-core');
const prefix = "6";
const queue = new Map();
client.on("warn", console.warn);
client.on('error', console.error);
client.on('ready', () => {console.log('Yo This Ready !'); client.user.setStatus('ide')});


client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	var args = message.content.split(' ');
	const serverQueue = queue.get(message.guild.id)
	if (message.content.startsWith(`${prefix}play`)) {
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.reply('**:microphone:يجب عليك التواجد بغرفة صوتية اولا**');
		const per = voiceChannel.permissionsFor(message.client.user);
		if (!per.has('CONNECT')) return message.reply('**:cold_sweat:لا يتوآجد لدي صلاحية للدخول بهذآ الروم**')
		if (!per.has('SPEAK')) return message.reply('**:zipper_mouth:لا يتوآجد لدي صلاحية للتكلم بهذآ الروم**');
		var search = require('youtube-search');
 
var opts = {
  maxResults: 1,
  key: "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4"
};
args = message.content.slice(4 + prefix.length).split(" ").join(" ")
console.log(args)
search(args, opts, async function(err, results) {
  if(err) return console.log(err);
  const songInfo = await ytdl.getInfo(`${results.map(r => r.link)}`);
  const song = {
	  title : songInfo.title,
	  url : songInfo.video_url
  }
  if (!serverQueue) {
	  const queueConstruct = {
		  textChannel : message.channel,
		  connection : null,
		  songs : [],
		  volume : 5,
		  playing : true,
		  voiceChannel : message.member.voiceChannel
	  };
	  queue.set(message.guild.id, queueConstruct);
	  queueConstruct.songs.push(song)
  try {
	  var connection = await voiceChannel.join();
	  queueConstruct.connection = connection
	  play(message.guild, queueConstruct.songs[0], message)
  } catch (error) {
	  console.log(error)
	  queue.delete(message.guild.id)
		  }
	  } else {
		  serverQueue.songs.push(song);
		  return message.reply(`**${song.title}** :arrow_forward: تم الإضآفة إلى قأئمة التشغيل`)
	  }

	  return undefined;
  const dispatcher = connection.playStream(ytdl(`${results.map(r => r.link)}`)).on('end', () => {
  });
  dispatcher.setVolumeLogarithmic(5 / 5)
});
	} else if (message.content.startsWith(`${prefix}stop`)) {
		if (!message.member.voiceChannel) return message.reply(':microphone:يجب عليك التواجد بغرفة صوتية اولا')
		if (!serverQueue) return message.reply('**:stop_button: لا يوجد شيء شغآل**');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('2');
		return undefined;
	} else if (message.content.startsWith(`${prefix}skip`)) {
		if (!message.member.voiceChannel) return message.reply('**:microphone:يجب عليك التواجد بغرفة صوتية اولا**')
		if (!serverQueue) return message.reply('**:stop_button: لا يوجد شيء شغآل**');
		serverQueue.connection.dispatcher.end('1');
		return undefined;
	} else if (message.content.startsWith(`${prefix}vol`) || message.content.startsWith(`${prefix}volume`)) {
		args = message.content.split(" ");
		if (!message.member.voiceChannel) return message.reply('**:microphone:يجب عليك التواجد بغرفة صوتية اولا**')
		if (!serverQueue) return message.reply('**:stop_button: لا يوجد شيء شغآل**');
		if (!args[1]) return message.reply('Current Volume Now ' + serverQueue.volume);
		if (args[1] > 100) return;
		if (args[1] < 1) return;
		serverQueue.volume = args[1]
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100);
		return msg.channel.send(`:speaker: تم تغير الصوت الي **${args[1]}**`);

		return undefined;
	} else if (message.content.startsWith(`${prefix}resume`)) {
		if (!message.member.voiceChannel) return message.reply('**:microphone:يجب عليك التواجد بغرفة صوتية اولا**')
		if (!serverQueue) return message.reply('**:stop_button: لا يوجد شيء شغآل**');
		serverQueue.playing = true;
		serverQueue.connection.dispatcher.resume();
		message.reply('Music Resumed ▶')
	} else if (message.content.startsWith(`${prefix}pause`)){
		if (!message.member.voiceChannel) return message.reply('**:microphone:يجب عليك التواجد بغرفة صوتية اولا**')
		if (!serverQueue) return message.reply('**:stop_button: لا يوجد شيء شغآل**');
		serverQueue.playing = false;
		serverQueue.connection.dispatcher.pause();
		message.reply('Music Paused ⏸')
		
	}

});
function play(guild, song, message) {
	const serverQueue = queue.get(guild.id);
	if (!song) {
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);
	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
	.on('end', () => {
		serverQueue.songs.shift()
		play(guild, serverQueue.songs[0])
	});
	dispatcher.setVolumeLogarithmic(5 / 5);
	message.reply(`**Now Playing** : **${song.title}**`)
}

client.on("message", message => {
	 if (message.content === `6play.`) {
		if (!message.member.voiceChannel) return message.reply('**Sorry,youre not on a voice channel**');
		message.member.voiceChannel.join().then(message.react('✅'));
	}
});



const adminprefix = "6";//by ,$ ReBeL ء , 🔕#4777 'CODES SERVER'
const devs = ['431150885549113344','452918050371534859','431779124898430979'];//by ,$ ReBeL ء , 🔕#4777 'CODES SERVER'
client.on('message', message => {//by ,$ ReBeL ء , 🔕#4777 'CODES SERVER'
  var argresult = message.content.split(` `).slice(1).join(' ');//by ,$ ReBeL ء , 🔕#4777 'CODES SERVER'
    if (!devs.includes(message.author.id)) return;//by ,$ ReBeL ء , 🔕#4777 'CODES SERVER'
    
if (message.content.startsWith(adminprefix + 'setgame')) {//by ,$ ReBeL ء , 🔕#4777 'CODES SERVER'
  client.user.setGame(argresult);
    message.channel.sendMessage(`**${argresult} تم تغيير بلاينق البوت إلى **`)
} else 
  if (message.content.startsWith(adminprefix + 'setname')) {
client.user.setUsername(argresult).then
    message.channel.sendMessage(`**${argresult}** : تم تغيير أسم البوت إلى`)
return message.reply("**لا يمكنك تغيير الاسم يجب عليك الانتظآر لمدة ساعتين . **");
} else
  if (message.content.startsWith(adminprefix + 'setavatar')) {
client.user.setAvatar(argresult);
  message.channel.sendMessage(`**${argresult}** : تم تغير صورة البوت`);
      } else     
if (message.content.startsWith(adminprefix + 'setT')) {
  client.user.setGame(argresult, "https://www.twitch.tv/idk");
    message.channel.sendMessage(`**تم تغيير تويتش البوت إلى  ${argresult}**`)
}

});








client.login(process.env.BOT_TOKEN);
