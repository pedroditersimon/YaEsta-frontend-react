// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
import { onMessage } from "firebase/messaging";

import apiClient from "../ApiClient/apiClient.mjs";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiZyZgDv1RYCe25zFG_KJS7_3ZXN5cU3M",
  authDomain: "ya-esta-a2426.firebaseapp.com",
  projectId: "ya-esta-a2426",
  storageBucket: "ya-esta-a2426.appspot.com",
  messagingSenderId: "33884576705",
  appId: "1:33884576705:web:bd4e078bcfe97cdb69ad40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

// Add the public key generated from the console here.
const vapidKey = "BCLtToimQqFdh9Q0qvnJxFqI9j_IJkXVAsLw-tYmdT2so5dsIPe-1Pmqw8UxHa4cn5cSGm7WtGZtpIcl2cuUPec";
const token = await getToken(messaging, {vapidKey: vapidKey});

// Function to handle incoming messages when the app is in the foreground
function handleForegroundMessages() {
  console.log("handleForegroundMessages");
  onMessage(getMessaging(), (payload) => {
    console.log('Foreground Message received: '+JSON.stringify(payload));
    // Customize how you want to handle the foreground message
    const { title, body } = payload.notification || {};
    if (title && body) {
      alert(`Notification received!\nTitle: ${title}\nBody: ${body}`);
    }
  });
}

// Request notification permissions and initialize message handling
async function init() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      handleForegroundMessages();
    } else {
      console.log('Notification permission denied.');
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
}

// Request notification permissions and initialize message handling
export async function sendTokenToServer() {
  try {
    console.log("Sending token: "+ token);
    const success = await apiClient.subscribe_user_notifications(token);
    if (success) {
      console.log('Notification token sended to server.');
    } else {
      console.log('Cannot send notification token to server.');
    }
  } catch (error) {
    console.error('Error sending notification token to server:', error);
  }
}

sendTokenToServer();
init();


export default messaging;
export { token };