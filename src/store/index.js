import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
  		if(new Date(task.date) < new Date()){
  			task.status = 'outdated'
  		}
  		return task
  	})
  },
  mutations: {
  	createTask(state, task){
  		state.tasks.push(task)

  		localStorage.setItem('tasks', JSON.stringify(state.tasks))
  	},
  	updateTask(state, {id, description, date}){
  		const tasks = state.tasks.concat();

  		const index = tasks.findIndex(t => t.id === id);
  		const task = tasks[index];

  		const status = new Date(date) > new Date() ? 'active' : 'outdated';

  		tasks[index] = {...task, date, description, status};

  		state.tasks = tasks;
  		localStorage.setItem('tasks', JSON.stringify(state.tasks))
  	},
  	compliteTask(state, id){
  		const index = state.tasks.findIndex(t => t.id === id);
  		state.tasks[index].status = 'complited';
  		localStorage.setItem('tasks', JSON.stringify(state.tasks))
  	}
  },
  actions: {
  	createTask({commit}, task){
  		commit('createTask', task)
  	},
  	updateTask({commit}, task){
  		commit('updateTask', task)
  	},
  	compliteTask({commit}, id){
  		commit('compliteTask', id)
  	}
  },
  getters: {
  	tasks(state){
  		return state.tasks
  	},
  	taskById(state){
  		return function(id){
  			return state.tasks.find(t => t.id === id)
  		}
  	}
  }
})
