<template>
    <div class="profile-wrapper">
        <div class="form">
            <h1>PROFILE</h1>
            <br /><br />
            <h2>Username</h2>
            <h4>{{ user.username }}</h4>
            <br />
            <h2>Email</h2>
            <h4>{{ user.email }}</h4>
            <br />
            <h2>Password hash</h2>
            <h4>{{ user.password }}</h4>
            <br><br>
            <h1>{{ error }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userProfile: this.$route.params.username,
            user: {},
            error: "",
        };
    },

    created() {
        this.axios.get(`http://localhost:3000/users/${this.userProfile}`).then(
            (res) => {
                console.log(res);
                this.user = res.data.user;
            },
            (err) => {
                console.log(err.response);
                this.error = err.response.data.title;
            }
        );
    },
};
</script>

<style>
.profile-wrapper {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;
    background-color: palevioletred;
}
.form {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

h1,
h4 {
    overflow-wrap: anywhere;
}
</style>
