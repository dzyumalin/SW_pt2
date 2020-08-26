import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'materialize-css/dist/js/materialize.min'

import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

firebase.initializeApp(
    {
        apiKey: "AIzaSyD0ZYJOPa0t8G_WSaE39sGBkYCvy9TGNio",
        authDomain: "smartworldacademy3.firebaseapp.com",
        databaseURL: "https://smartworldacademy3.firebaseio.com",
        projectId: "smartworldacademy3",
        storageBucket: "smartworldacademy3.appspot.com",
        messagingSenderId: "37701078080",
        appId: "1:37701078080:web:e01e4bf0a0ea53cc2ea3a5",
        measurementId: "G-DT4J5XM2RG"
    });

let app;
firebase.auth().onAuthStateChanged(()=> {
    if (!app) {
    app = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app');
    }
});

