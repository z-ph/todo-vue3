<template>
	<div id="todo">
		<h1 class="todo-title">Todos</h1>
		<div class="input-group">
			<input
				type="text"
				placeholder="add a new todo"
				autocomplete="off"
				@keyup.enter="submit"
				v-model.trim="inputValue"
				ref="inputRef" />
			<button @click="submit"></button>
		</div>
		<todo-list
			:todos="todos"
			:filtered="filtered"
			:filtered-todos="filteredTodos" />
		<div
			class="side-bar"
			v-show="todos.length !== 0">
			<div
				class="filter"
				@click="filtered = !filtered"
				v-text="filtered ? '显示所有' : '只显示未完成'"></div>
			<div
				class="delCompleted"
				v-show="todos.filter((todo) => todo.completed).length !== 0"
				v-text="'删除已完成'"
				@click="todos = todos.filter((todo) => !todo.completed)"></div>
			<div
				class="delAll"
				v-text="'删除所有'"
				@click="todos = []">
			</div>
			<div
				class="allCompleted"
				v-text="'全部完成'"
				@click="todos.forEach((todo) => (todo.completed = true))"></div>
		</div>
	</div>
</template>

<script setup>
	import { computed, onMounted, ref } from "vue";
	import TodoList from "./components/todo-list.vue";
	import { storeToRefs } from "pinia";
	import { useTodoStore } from "./stores/todos";
	let id = 0;
	const store = useTodoStore();
	const { todos, filtered, filteredTodos } = storeToRefs(store);
	todos.value.forEach((todo, index) => {
		todo.id = index;
		id++;
	});
	const inputValue = ref("");
	const inputRef = ref(null);
	function submit() {
		if (inputValue.value === "") {
			return;
		}
		todos.value.push({
			text: inputValue.value,
			completed: false,
			id: id++,
		});
		console.log(todos.value.at(-1));
		inputValue.value = "";
		inputRef.value.focus();
	}
</script>

<style>
	h1 {
		margin: 0;
		padding: 20px;
	}
	.side-bar {
		position: absolute;
		top: 150px;
		display: flex;
		flex-direction: column;
		cursor: pointer;
	}
	.side-bar > * {
		color: #666;
		width: 100px;
		padding: 5px;
		border: 1px solid #ddd;
		text-align: center;
		user-select: none;
	}
	:root {
		--bg-color: #f5f5f5;
		--grey: #333;
		--todo-width: 760px;
	}

	#app {
		background-color: #f5f5f5;
		position: absolute;
		height: 100vh;
		width: 100%;
	}
	#todo {
		position: relative;
		width: 720px;
		background: #fff;
		margin: 0 auto;
		height: 100vh;
	}
	@media (max-width: 720px) {
		#todo {
			width: calc(100vw - 30px);
		}
	}
	.input-group {
		display: flex;
		justify-content: center;
	}

	.input-group button {
		padding-right: 40px;
		border-radius: 20px;
		border-start-start-radius: 0;
		border-end-start-radius: 0;
		border: 1px solid #333;
		border-left: none;
		background-color: #fff;
		color: #333;
		width: fit-content;
		flex-basis: 40px;
		flex-grow: 0;
		background-image: url("./assets/add.svg");
		background-size: 35px;
		background-repeat: no-repeat;
		background-position: center;
		cursor: pointer;
	}

	.input-group input {
		box-sizing: border-box;
		height: 40px;
		border-radius: 20px;
		border-start-end-radius: 0;
		border-end-end-radius: 0;
		border: 1px solid #333;
		background-color: #fff;
		color: #333;
	}

	.input-group input:focus {
		outline: none;
	}

	h1.todo-title {
		text-align: center;
		opacity: 0.5;
		color: #333;
	}

	input {
		padding-left: 20px;
		height: 40px;
		line-height: 40px;
		width: 100%;
		max-width: 400px;
	}
	.hover-flow {
		transition: all 0.3s ease-in-out;
	}
	.hover-flow:hover {
		transform: scale(1.02) translateY(-5%);
	}
</style>
