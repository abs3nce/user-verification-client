<template>
    <div class="register-wrapper">
        <div class="form">
            <h1>Register</h1>
            <br />
            Username: <input type="text" v-model="username" required />
            <br />
            Email: <input type="text" v-model="email" required />
            <br />
            Password: <input type="password" v-model="password" required />
            <br />
            <button @click="registerUser()">Register me!</button><br />
            <div class="message-box" v-if="error">
                <p>{{ error }}</p>
            </div>
            <br />
            <button @click="toLoginPage()">Already registered</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        registerUser() {
            console.log(
                `Registered user credentials:\nUsername: ${this.username}\nEmail: ${this.email}\nPassword: ${this.password}`
            );
            let newUser = {
                username: this.username,
                email: this.email,
                password: this.password,
            };
            this.axios.post("http://localhost:3000/register", newUser).then(
                (res) => {
                    console.log(res);
                    this.error = null;
                    this.$router.push("/login");
                },
                (err) => {
                    console.log(err.response);
                    this.error = err.response.data.title;
                }
            );
        },
        toLoginPage() {
            this.$router.push("/login");
        },
    },
    data() {
        return {
            username: undefined,
            email: undefined,
            password: undefined,

            error: null,
        };
    },
    name: "Register",
};
</script>

<style>
.register-wrapper {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;
    background-color: lightskyblue;
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
