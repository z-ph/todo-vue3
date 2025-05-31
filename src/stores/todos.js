// stores/todo.js
import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
export const useTodoStore = defineStore("todo", () => {
	const todos = ref([]);
	todos.value = JSON.parse(localStorage.getItem("todos")) ?? [];
	const inputValue = ref("");
	const filtered = ref(false);
	const filteredTodos = computed(() => {
		return filtered.value
			? todos.value.filter((todo) => !todo.completed)
			: todos.value;
	});
	function save() {
		localStorage.setItem("todos", JSON.stringify(todos.value));
	}
	function deleteTodo(todo) {
		const index = todos.value.indexOf(todo);
		todos.value.splice(index, 1);
	}
	function toggleCompleted(index) {
		todos.value[index].completed = !todos.value[index].completed;
	}
	watch(
		() => todos.value,
		(newTodos) => {
			save();
		},
		{ deep: true }
	);
	return {
		todos,
		filtered,
		inputValue,
		filteredTodos,
		deleteTodo,
		toggleCompleted,
	};
});
