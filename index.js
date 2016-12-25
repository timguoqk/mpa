'use strict';
var login = require('facebook-chat-api');
var credentials = require('./credentials');
var THREAD_ID = '1688248234796920';
var SENDER_ID = '100004282681626';

login(credentials, function callback(err, api) {
    if(err)
        return console.error(err);

    api.getThreadInfo(THREAD_ID, function(err, obj) {
        console.log(err);
        console.log(obj);
    });
 
    api.setOptions({listenEvents: true});
 
    var stopListening = api.listen(function(err, event) {
        if(err)
          return console.error(err);

        if (event.type === 'message' && event.senderID === SENDER_ID && event.threadID === THREAD_ID) {
            if (event.body.indexOf('?') > -1)
                api.sendMessage('https://www.google.com/search?q=' + encodeURIComponent(event.body), event.threadID);
        }
    });
});
