<script>
	import todoContent from "./todo-content.vue";
	import checkBtn from "./check-btn.vue";
	import delBtn from "./del-btn.vue";
	export default {
		components: {
			checkBtn,
			todoContent,
			delBtn,
		},
		name: "todo-list",
		props: {
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
		},
		methods: {
			deleteTodo(index) {
				this.todos.splice(index, 1);
			},
			save() {
				localStorage.setItem("todos", JSON.stringify(this.todos));
			},
			toggleCompleted(index) {
				this.todos[index].completed = !this.todos[index].completed;
			},
		},

		watch: {
			todos: {
				handler() {
					this.save();
				},
				deep: true,
			},
		},
	};
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
