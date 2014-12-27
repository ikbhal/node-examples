var FB = require('fb');
var accessToken = 'CAACEdEose0cBAMxhpXZCm5mBU8zwIlXuLFZCSYgHtouoo0XOlPRKg41Aik3S6jru4mqd5SaLMz0IE5vlLFDgxztEdQIZC7fRImu8vWUUe3Wpu7l28ZAZBZA5Ie3s2a7orICfGt5NCP4pTxq3SLAANZCLbOYS6FNTXuNuQpCzd8rULLDWGtoWqLHntZBZBu6MhULvNBIx9ZCxP41yNhdDda1lAUvzWjoGj3Wa0ZD';
FB.setAccessToken(accessToken);

var body = 'My first app request using facebook-node-sdk (fb npm module)';
FB.api('me/apprequests', 'post', { message: body} , fucntion(res){
	if(!res || res.error) {
		console.log(!res? 'error occurred' : res.error);
		return ;
	} 
	console.log('App Request id : ' + res.id);
});