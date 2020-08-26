<template>
    <div class="todoList">
        <div>
            <button class="todoList-item" v-for="list in this.$store.state.lists"
                    v-bind:key="list.listName"
                    v-bind:class="thisActiveList===list.listName ? 'active' : ''"
                    v-on:click="openList(list.listName)">
                {{list.listName}}
                <button class="button button-delete" v-on:click="DeleteList(list.listName)">×</button>
            </button>
        </div>
        <div class="AddTask">
            <input class="AddTaskListText" v-model="newList.name" type = "text" placeholder="Добавить список"/>
            <button v-on:click="CreateList(newList.name)">+</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TodoList',
        data: () => ({
            newList: {
                name: ''
            },
            thisActiveList: ''
        }),
        async created() {
            await this.$store.dispatch('openTodo');
            this.thisActiveList = this.$store.state.activeList;
        },
        methods: {
            openList(listName) {
                this.$store.dispatch('AllTasks', listName);
                this.thisActiveList = listName;
            },
            CreateList(newListName) {
                this.$store.dispatch('CreateList', newListName);
            },
            async DeleteList(listName) {
                if (confirm(`Удалить список ${listName}?`)) {
                    await this.$store.dispatch('DeleteList', listName);
                    this.thisActiveList = this.$store.state.activeList;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.todoList {
    top: 57px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 24%;
    height: calc(100vh - 100px);
    border: 1px solid #535353;
}
.todoList-item {
    text-align: left;
    position: relative;
    padding: 10px;
    width: 250px;
    border: 1px solid #53535331;
    background-color: #fff;
    color: #535353;
    transition: 0.5s all;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 10px;
}

.AddTaskListText {
    min-width:  calc(100% - 50px);
    margin: 0 10px;
    border: none;
    padding: 0;
}

input:focus {
    outline: none;
}
.button-delete {
    position: absolute;
    top: 0px;
    right: 0;
    width: 20px;
    height: 20px;
    padding-top: 0px;
    padding-left: 4px;
    margin: 9px;
    cursor: pointer;
    background-color: #f2f2f2;
    border: 1px solid #53535331;
    border-radius: 10px;
    transition: 0.5s all;
    &:hover {
        background-color: grey;
    }
}

.AddTask {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #535353;
    height: 30px;
    border-radius: 10px;
    width: 100%;
    button {
        border: 1px solid #53535331;
        height: 25px;
        width: 25px;
        background-color: #f2f2f2;
        color: black;
        margin-right: 1px;
        border-radius: 0 10px 10px 0;
        transition: 0.5s all;
        cursor: pointer;
        &:hover {
            background-color: grey;
        }
    }
}
</style>