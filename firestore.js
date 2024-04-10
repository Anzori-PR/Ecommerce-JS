const firebaseConfig = {

    apiKey: "AIzaSyAIr5oOxsmrRY1ckvVjzI5lKfaKGZL0Nyo",

    authDomain: "first-project-51a51.firebaseapp.com",

    projectId: "first-project-51a51",

    storageBucket: "first-project-51a51.appspot.com",

    messagingSenderId: "933776983263",

    appId: "1:933776983263:web:e0087bbc897bd349fb556a",

    measurementId: "G-WZ9P90S5JW"

};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
