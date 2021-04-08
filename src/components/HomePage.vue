<template>
    <div class="home-wrapper">
        <div class="form">
            <h1>Home</h1>
            <br />
            <button @click="logout()">Logout</button>
            <br />
            <div class="user-info">
                <p>Username: {{ user.username }}</p>
                <p>Email: {{ user.email }}</p>
            </div>
            <br /><button @click="refreshUserInfo()">Refresh user info</button>

            <br /><br />

            <div class="users">
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                    <tr v-for="listUser in allUsers" :key="listUser._id">
                        <td>{{ listUser.username }}</td>
                        <td>{{ listUser.email }}</td>
                        <td>
                            <router-link :to="'/' + listUser.username">
                                <button>
                                    View Profile
                                </button>
                            </router-link>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: "",
            allUsers: undefined,
        };
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push("/login");
        },

        refreshUserInfo() {
            this.axios
                .get("http://localhost:3000/user", {
                    headers: { token: localStorage.getItem("token") },
                })
                .then(
                    (res) => {
                        this.user = res.data.user;
                        console.log(res);
                    },
                    (err) => {
                        console.log(err.response);
                    }
                );
        },

        getAllUsers() {
            this.axios.get("http://localhost:3000/users").then((res) => {
                console.log(res.data);
                this.allUsers = res.data;
            });
        },
    },

    created() {
        //user not authorized
        if (localStorage.getItem("token") == null) {
            this.$router.push("/login");
        }
    },

    mounted() {
        this.axios
            .get("http://localhost:3000/user", {
                headers: { token: localStorage.getItem("token") },
            })
            .then(
                (res) => {
                    this.user = res.data.user;
                    console.log(res);
                },
                (err) => {
                    console.log(err.response);
                }
            );
        this.getAllUsers();
    },
};
</script>

<style>
.home-wrapper {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100%;
    background-color: lightgreen;
}
.form {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.users {
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
}
</style>
