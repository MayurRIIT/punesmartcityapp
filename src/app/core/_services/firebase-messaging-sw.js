importScripts('https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.3.0/firebase-messaging.js');


firebase.initializeApp({
  'messagingSenderId': '822695474270'
});

const messaging = firebase.messaging()
console.log(messaging);
