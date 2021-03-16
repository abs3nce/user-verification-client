import Vue from "vue";
import App from "./App.vue";

//import routeru a zapnutie routeru
import VueRouter from "vue-router";
Vue.use(VueRouter);

//import routes
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";

//routes array 
const routes = [
    { path: "/", component: HomePage },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
];

//router config
const router = new VueRouter({
    mode: "history",
    routes,
});

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
