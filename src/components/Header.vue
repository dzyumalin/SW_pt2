<template>
    <div>
        <header class="header-todo">
            <h1 class="header-todo__h1">todo</h1>
            <div class="header-todo__exitEmail" v-if="this.$store.state.user">
                {{this.$store.state.user}}
                <button class="button button_logout" @click.prevent="logout">Выйти</button>
            </div>
            <div v-else class="message logOut">
                Вы не авторизованы
                <router-link to="/login">Авторизоваться</router-link>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        methods: {
            async logout() {
                await this.$store.dispatch('logout');
                await this.$router.push('/login')
            }
        }
    }
</script>

<style scoped lang="scss">
.button {
    &_logout {
        background-color: grey;
        color: #fff;
        border: none;
        padding: 5px 15px;
        margin: 0 15px;
        border-radius: 20px;
        cursor: pointer;
    }
}
.header-todo {
    height: 100px;
    background-color: #4a524f85;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    border-bottom: 1px solid #535353;
    width: 100%;
    position: relative;
    &__h1 {
        padding: 7px 30px;
        font-size: 30px;
        margin: 0;
    }
    &__exitEmail {
    position: absolute;
    right: 0;
    }
}

.logOut {
    color: #ffffff;
    margin: 0 15px;
    font-size: 16px;
}
.logOut a {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    margin-left: 20px;
}
</style>