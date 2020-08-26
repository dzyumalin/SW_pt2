<template>
    <div class="grey layout">
        <form class="card login" v-on:submit.prevent="onReg">
            <div class="login-content">
                <span class="card-title">Регистрация</span>
                <div class="input-field">
                    <input
                            id="email"
                            type="text"
                            v-model="email"
                            v-bind:class="{error: this.$store.state.logErr}"
                    >
                    <label for="email">Email</label>
                    <small class="helper-text invalid">Email</small>
                </div>
                <div class="input-field">
                    <input
                            id="password"
                            type="password"
                            v-model="password"
                            v-bind:class="{error: this.$store.state.logErr}"
                    >
                    <label for="password">Пароль</label>
                    <small class="helper-text invalid">Пароль</small>
                </div>
                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model="name"
                            v-bind:class="{error: this.$store.state.logErr}"
                    >
                    <label for="name">Имя</label>
                    <small class="helper-text invalid">Имя</small>
                </div>
                <label>
                    <input type="checkbox" v-bind:class="{error: this.$store.state.logErr}"/>
                    <span>Согласен с правилами</span>
                </label>
                <div style="color: red" v-if="this.$store.state.logErr">Вы ввели некорретные данные</div>
            </div>
            <div class="card-action">
                <div>
                    <button class="btn waves-effect waves-light" type="submit">Зарегистрироваться
                    </button>
                </div>
                <p class="center">
                    Уже есть аккаунт?
                    <router-link to="/login">Войти!</router-link>
                </p>
            </div>
        </form>
    </div>

</template>


<script>
    import firebase from 'firebase/app';
    import "firebase/auth";

    export default {
        data: () => ({
            name: '',
            email: '',
            password: ''
        }),
         methods: {
            onReg() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
                this.logOk();
                })
                .catch((err) => {
                    this.$store.commit('authErr', err);
                });
            },
            async logOk() {
                this.$store.commit('Auth');
                this.$store.commit('actUser');
                await this.$router.push('todo');
            }
        }
    }
</script>

<style lang="scss">
    @import "~materialize-css/dist/css/materialize.min.css";
.layout {
    height: 100vh;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.login {
    width: 400px;
    text-align: center;
    &-content {
    padding: 24px 24px 0 24px;
    border-radius: 20px;
    }
}

.input-field {
    input {
        border-radius: 10px;
        padding-left: 10px;
    }
}
.helper-text.invalid {
    color: red;
}
</style>