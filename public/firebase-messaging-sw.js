importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCP9swcjOq_PhzMWa-DYuunZc1I3XuT3YU",
  authDomain: "drello-0000.firebaseapp.com",
  projectId: "drello-0000",
  storageBucket: "drello-0000.firebasestorage.app",
  messagingSenderId: "822174348999",
  appId: "1:822174348999:web:d167d9a6ea867a393530e2",
  measurementId: "G-LRVHQJRBVG",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
