import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const availableHours = [];
for (var i = 0; i < 24; i++) {
	availableHours.push(i);
}

const vuexStore = new Vuex.Store({
	strict: true,
	state: {		
		hours: availableHours,
		tasks: [],
		jobs: [],
	},
	getters: {
		hours: state => state.hours,	
		tasks: state => state.tasks,
		jobs: state => state.jobs,
	},
	mutations: {		
		setTasks(state, payload) {
			state.tasks = payload;
		},
		setJobs(state, payload) {
			state.jobs = payload;
		},
	},
	actions: {
		async getTasks({ commit }) {
			//API call
			const tasksResponseData = [
				{
					id: 1,
					name: "Print",
					durationInHours: 2,
				}, {
					id: 2,
					name: "Laminate",
					durationInHours: 3,
				}, {
					id: 3,
					name: "Trim",
					durationInHours: 1,
				}, {
					id: 4,
					name: "Paint",
					durationInHours: 2,
				}
			];
			commit('setTasks', tasksResponseData);
		},
		async getJobs({ commit }) {
			//API call
			const jobsResponseData = [
				{
					id: 1,
					name: "Task A",
					orderedTaskIds: [1,2,3]
				}, {
					id: 2,
					name: "Task B",
					orderedTaskIds: [1,2,4]
				}, {
					id: 3,
					name: "Task C",
					orderedTaskIds: [3]
				}, {
					id: 4,
					name: "Task D",
					orderedTaskIds: [2,3,4]
				}, {
					id: 5,
					name: "Task E",
					orderedTaskIds: [4]
				}
			];
			commit('setJobs', jobsResponseData);
		},
	},
});
export default vuexStore;
