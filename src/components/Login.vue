<template>
    <div class="grey layout">
    <form class="card login" v-on:submit.prevent="onLog">
        <div class="login-content">
            <span class="card-title">Авторизация</span>
            <div class="input-field">
                <input id="email" type="email" v-model="login" v-bind:class="{error: this.$store.state.logErr}">
                <label for="email">Почта</label>
                <small class="helper-text">Почта</small>
            </div>
            <div class="input-field">
                <input id="password" type="password" v-model="password" v-bind:class="{error: this.$store.state.logErr}">
                <label for="password">Пароль</label>
                <small class="helper-text">Пароль</small>
            </div>
            <div style="color: red" v-if="this.$store.state.logErr">Вы ввели не верный логин или пароль</div>
        </div>
        <div class="card-action">
            <div>
                <button class="btn waves-effect waves-light" type="submit">
                    Войти
                </button>
            </div>
            <p class="center">
                Не завели аккаунт?
            <router-link to="/register">Зарегистрироваться</router-link>
            </p>
        </div>
    </form>
    </div>
</template>

<script>
    import * as firebase from 'firebase/app';
    import "firebase/auth";

    export default {
        name: 'Login',
        data: () => ({
            login: '',
            password: ''
        }),
        methods: {
            onLog() {
                firebase.auth().signInWithEmailAndPassword(this.login, this.password)
                    .then(() => {
                        this.logOk();
                    })
                    .catch(() => {
                        this.$store.commit('Error');
                    });
            },
            logOk() {
                this.$store.commit('Auth');
                this.$store.commit('actUser');
                this.$router.push('todo');
            }
        }
    }
</script>

<style scoped lang="scss">

    @import "~materialize-css/dist/css/materialize.min.css";

.layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding-top: 50px;
}
.login {
    width: 400px;
    text-align: center;
    input {
        border-radius: 10px;
        padding-left: 10px;
    }
    button {
        border-radius: 10px;
    }
    &-content {
    padding: 24px 24px 0 24px;
    border-radius: 20px;
    }
}
.helper-text.invalid {
    color: red;
}
</style>