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
				ref="input" />
			<button @click="submit"></button>
		</div>
		<todo-list
			:todos="todos"
			:filtered="filtered" />
		<div class="side-bar">
			<div
				class="filter"
				@click="filtered = !filtered"
				v-text="filtered ? '显示所有' : '只显示未完成'"></div>
		</div>
	</div>
</template>

<script>
	import TodoList from "./components/todo-list.vue";

	export default {
		name: "App",
		components: {
			TodoList,
		},
		data() {
			return {
				todos: [],
				inputValue: "",
				filtered: false,
			};
		},
		methods: {
			submit() {
				if (this.inputValue === "") {
					return;
				}
				this.todos.push({
					text: this.inputValue,
					completed: false,
				});
				this.inputValue = "";
				this.$refs.input.focus();
			},
		},

		mounted() {
			this.todos = JSON.parse(localStorage.getItem("todos")) ?? [];
		},
	};
</script>

<style>
	.side-bar {
		position: absolute;
		top: 150px;
		display: flex;
		flex-direction: column;
		cursor: pointer;
	}
	.filter {
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
		width: 100%;
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		height: 100vh;
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
