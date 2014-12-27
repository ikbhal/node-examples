/*
var FB = require('fb');
var accessToken = 'CAACEdEose0cBAJAJ0bx3y1gcSE5pxfyx4ZCWrfFR7qEqSVAZBL1XDgURjZCZCCCBl1ok2RnlcNk4wSxDtSiA2Vw1YxUE0DHkyMYHyGjOSohbwGnU093XqotK9Ph9Ow30mRZCetnA12Id5xSTV6GlmGf9phUYvTFJwmzb0U2vbZCIZBAMhVbnSyRsuB75es5ZBeX3sG4UUMxZCSiTw7Dy1ZCYrkHJi4RZAiCcmoZD';
FB.setAccessToken(accessToken);

var body = 'My first post using facebook-node-sdk(fb npm nodule)';
FB.api('me/feed', 'post', { message: body}, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.id);
});

*/

var FB = require('fb');
var accessToken = 'CAACEdEose0cBAJAJ0bx3y1gcSE5pxfyx4ZCWrfFR7qEqSVAZBL1XDgURjZCZCCCBl1ok2RnlcNk4wSxDtSiA2Vw1YxUE0DHkyMYHyGjOSohbwGnU093XqotK9Ph9Ow30mRZCetnA12Id5xSTV6GlmGf9phUYvTFJwmzb0U2vbZCIZBAMhVbnSyRsuB75es5ZBeX3sG4UUMxZCSiTw7Dy1ZCYrkHJi4RZAiCcmoZD';
FB.setAccessToken(accessToken);

var body = 'My first post using facebook-node-sdk (fb npm module)';
FB.api('me/feed', 'post', { message: body} , fucntion(res){
	if(!res || res.error) {
		console.log(!res? 'error occurred' : res.error);
		return ;
	} 
	console.log('Post id : ' + res.id);
});