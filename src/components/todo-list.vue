<script setup>
	import todoContent from "./todo-content.vue";
	import checkBtn from "./check-btn.vue";
	import delBtn from "./del-btn.vue";
	import { useTodoStore } from "@/stores/todos";
	import { watch } from "vue";
	const props = defineProps({
		todos: {
			type: Array,
			default: () => [],
		},
		filtered: {
			type: Boolean,
			default: () => false,
		},
		filteredTodos: {
			type: Array,
			default: () => [],
		},
	});
	function deleteTodo(index) {
		props.todos.splice(index, 1);
	}
	function save() {
		localStorage.setItem("todos", JSON.stringify(props.todos));
	}
	function toggleCompleted(index) {
		props.todos[index].completed = !props.todos[index].completed;
	}
	// 明确依赖 props.todos 的响应式值（推荐）
	watch(
		() => props.todos,
		(newTodos) => {
			localStorage.setItem("todos", JSON.stringify(newTodos));
		},
		{ deep: true }
	);
</script>
<template>
	<div class="todos">
		<div
			class="todo"
			v-for="(todo, index) in filteredTodos"
			:key="index">
			<check-btn
				:todo="todo"
				:checked="todo.completed"
				@click="toggleCompleted(index)" />
			<todo-content
				:content="todo.text"
				:line-through="todo.completed" />
			<del-btn @click="deleteTodo(index)" />
		</div>
	</div>
</template>
<style scoped>
	.todos {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	.todo {
		position: relative;
		max-width: 400px;
		width: 100%;
		height: auto;
		border: 1px solid #ccc;
		border-radius: 20px;
		/* border-left: none; */
		background-color: #fff;
	}
	.todo > * {
		display: inline-block;
		vertical-align: bottom;
	}
</style>
