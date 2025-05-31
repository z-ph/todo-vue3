// stores/todo.js
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
	// data
	state: () => ({
		todos: [],
		filter: "all", // 'all', 'active', 'completed'
	}),
	// computed
	getters: {
		filteredTodos: (state) => {
			if (state.filter === "active") {
				return state.todos.filter((todo) => !todo.completed);
			} else if (state.filter === "completed") {
				return state.todos.filter((todo) => todo.completed);
			}
			return state.todos;
		},
		activeTodoCount: (state) => {
			return state.todos.filter((todo) => !todo.completed).length;
		},
	},
	// methods
	actions: {
		addTodo(text) {
			this.todos.push({
				id: Date.now(),
				text,
				completed: false,
			});
		},
		toggleTodo(id) {
			const todo = this.todos.find((todo) => todo.id === id);
			if (todo) {
				todo.completed = !todo.completed;
			}
		},
		removeTodo(id) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},
		clearCompleted() {
			this.todos = this.todos.filter((todo) => !todo.completed);
		},
		setFilter(filter) {
			this.filter = filter;
		},
	},
});
