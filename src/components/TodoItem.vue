<template>
    <div>
        <div class="todoTask">
            <div class="todoTask-tasks" v-for="task in this.$store.state.tasks" v-bind:key="task.id">
                <div>
                    <input class="todoTask-tasks__check" type="checkbox" v-bind:id="task.id" v-bind="{checked: task.done}" v-on:click="makeDone(task.taskName)" />
                    <label v-bind:for="task.id"></label>
                    <div class="todoTask-tasks__important" v-if="task.important"></div>
                    <div class="todoTask-tasks__paragraph" v-bind:class="{done: task.done}">{{task.taskName}}</div>
                </div>
                <div class="todoTask-tasks__delete">
                    {{task.dataCreated}}
                    <button class="button button-delete_tasks" v-on:click="DeleteTask(task.taskName)">×</button>
                </div>
            </div>
        </div>
        <div class="TodoAddTask">
            <div class="AddTask">
                <input class="AddTaskListText" v-model="newTask.name" type="text" placeholder="Добавить задачу" />
                <button v-on:click="CreateTask(newTask.name, newTask.important)">+</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TodoItem',
        data: () => ({
            newTask: {
                name: '',
                important: ''
            }
        }),
        methods: {
            CreateTask(newTaskName, important) {
                let CreateDataTime = new Date().getDate()+'.'+ (new Date().getMonth()+1)+'.'+ new Date().getFullYear()+' '+new Date().getHours()+':'+new Date().getMinutes(),
                    payload = {
                        newTaskName,
                        important,
                        CreateDataTime
                    };
                this.$store.dispatch('CreateTask', payload);
            },
            makeDone(taskDoneName) {
                this.$store.dispatch('makeDone', taskDoneName);
            },
            DeleteTask(taskName) {
                if (confirm(`Удалить задачу ${taskName}?`)) {
                    this.$store.dispatch('DeleteTask', taskName);
                }
            },
        }
    }
</script>
<style scoped lang="scss">
.todoTask {
    position: absolute;
    left: 500px;
    padding: 10px;
    width: calc(100% - 500px);
    height: calc(100% - 140px);
    border-radius: 10px;
    &-tasks {
        position: relative;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 15px;
        border: 1px solid #53535331;
        border-radius: 10px;
        &__important {
        position: absolute;
        left: 4px;
        top: 15px;
        width: 15px;
        height: 15px;
        border-radius: 25px;
        background-color: lightcoral;
        }
        &__delete {
            margin-right: 20px;
        }
    }
}
.button-delete {
    &_tasks {
        position: absolute;
        top: 6px;
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
}
.TodoAddTask {
    width: calc(100vw - 541px);
    max-width: 800px;
    position: absolute;
    left: 500px;
    bottom: 1px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    margin-bottom: 10px;
}
.AddTask button {
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
.AddTask button:hover {
    border: 1px solid #53535331;
    height: 25px;
    width: 25px;
    background-color: grey;
    color: black;
}
</style>