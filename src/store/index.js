import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        lists: [],
        tasks: [],
        logErr: false,
        login: false,
        activeList: null,
        userID: '',
        errMsg: '',
        maxID: '',
        user: ''
    },
    mutations: {
        Auth: (state) => {
            state.logErr = false;
            state.login = true;
            firebase.auth().onAuthStateChanged((user) => {
                state.user = user.email;
                state.userID = user.uid;
                localStorage.user = state.user;
                localStorage.userID = state.userID;
            })
        },

        getUser: (state) => {
            if (localStorage.user) {
                state.user = localStorage.user;
                state.userID = localStorage.userID;
            }
        },

        newActiveList: (state, newListName) => {
            state.activeList = newListName;
        },

        Error: (state, error) => {
            state.logErr = true;
            state.errMsg = error;
        }
    },
    actions: {
        getLists: async ({state}) => {
            let DataBase = firebase.database();
            await DataBase.ref(`/${state.userID}`).once('value')
            .then((snap) => {
                let value = snap.val();
                let result = [];
                for (let listName in value) {
                    result.push({'listName': listName});
                }
                state.lists = result;
                state.activeList = result[0].listName;
            })
            .catch((err) => {
                console.log(err.message);
            })
        },

        CreateList: async ({state, dispatch}, newListName) => {
            let DataBase = firebase.database();
            await DataBase.ref(`/${state.userID}/` + newListName).set({}[`${newListName}`] = '', (err) =>
            {
                if (!err) {
                    dispatch('openTodo');
                } else {
                    console.log(err.message);
                }
            })
        },

        DeleteList: async ({state, dispatch}, listName) => {
            let DataBase = firebase.database();
            await DataBase.ref(`/${state.userID}/` + listName).set(null, async (err) => {
                if (!err) {
                    await dispatch('openTodo')
                } else {
                    console.log(err.message);
                }
            })
        },

        CreateTask: async ({state}, {CreateDataTime, important, newTaskName}) => {
            let {maxID, activeList, userID} = state;
            let DataBase = firebase.database();
            DataBase.ref(`/${userID}/${activeList}/` + newTaskName).set({}[`${newTaskName}`] = '', (err) =>
            {
                if (!err) {
                    if (maxID) {
                        maxID = maxID + 1;
                    } else {
                        maxID = 0;
                    }

                    if (important) {
                        DataBase.ref(`/${userID}/${activeList}/${newTaskName}`).set({'important': true, 'id': maxID, 'dataCreated': CreateDataTime}, (err) =>
                        { if (err) 
                            return console.log(err.message); 
                        });
                    } else {
                        DataBase.ref(`/${userID}/${activeList}/${newTaskName}`).set({'id': maxID, 'dataCreated': CreateDataTime}, (err) =>
                        { if (err) 
                            return console.log(err.message); 
                        });
                    }
                } else {
                    console.log(err.message);
                }
            })
        },

        AllTasks: async ({state, commit}, newListName) => {
            let DataBase = firebase.database();
            state.maxID = '';
            if (newListName) {
                commit('newActiveList', newListName)
            }
            await DataBase.ref(`/${state.userID}/${state.activeList}`).on('value', async (snap) => {
                let value = snap.val();
                let result = [];
                for (let taskName in value) {
                    let task = {};
                    task.taskName = taskName;
                    await DataBase.ref(`/${state.userID}/${state.activeList}/${taskName}`).once('value')
                    .then((snap) => {
                        let value = snap.val();
                        for (let attr in value) {
                            task[`${attr}`] = value[attr];
                            if (attr === 'id' && value[attr] > state.maxID) {
                                state.maxID = value[attr];
                            }
                        }
                    });
                    result.push(task);
                }
                state.tasks = result;
            })
        },

        makeDone: async ({state}, taskDoneName) => {
            const {tasks, activeList, userID} = state;
            let DataBase = firebase.database(),
                taskDone = tasks.filter((task) => task.taskName === taskDoneName)[0];
                taskDone.done = !taskDone.done;

            DataBase.ref(`/${userID}/${activeList}/` + taskDoneName).set(taskDone, (err) => {
                if (err) console.log(err.message);
            });
        },

        DeleteTask: async ({state}, taskName) => {
            let DataBase = firebase.database();

            await DataBase.ref(`/${state.userID}/${state.activeList}/` + taskName).set(null, (err) =>
            { if (err) 
                console.log(err.message); 
            });
        },

        openTodo: async ({dispatch}) => {
            await dispatch('getLists').then(() => {
                dispatch('AllTasks');
            })
        }
    }
});
export default store
