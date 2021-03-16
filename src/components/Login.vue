<template>
    <div class="login-wrapper">
        <div class="form">
            <h1>Login</h1>
            <br />
            Username: <input type="text" v-model="username" />
            <br />
            Password: <input type="password" v-model="password" />
            <br />
            <button @click="loginUser()">Log me in!</button><br />
            <div class="message-box" v-if="error">
                <p>{{ error }}</p>
            </div>
            <br />
            <button @click="toRegisterPage()">I don't have an account</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        loginUser() {
            console.log(
                `Login credentials:\nUsername: ${this.username}\nPassword: ${this.password}`
            );
            let user = {
                username: this.username,
                password: this.password,
            };

            this.axios.post("http://localhost:3000/login", user).then(
                (res) => {
                    console.log(res);
                    this.error = null;
                    localStorage.setItem("token", res.data.token);
                    this.$router.push("/");
                },
                (err) => {
                    console.log(err.response);
                    this.error = err.response.data.title;
                }
            );
        },
        toRegisterPage() {
            this.$router.push("/register");
        },
    },
    data() {
        return {
            username: "",
            password: "",

            error: null,
        };
    },
    name: "Login",
};
</script>

<style>
.login-wrapper {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;
    background-color: lightsalmon;
}
.form {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.message-box {
    width: 100%;
    height: 10%;
    background: red;
    color: white;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
