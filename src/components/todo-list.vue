<script setup>
	import todoContent from "./todo-content.vue";
	import checkBtn from "./check-btn.vue";
	import delBtn from "./del-btn.vue";
	import { useTodoStore } from "@/stores/todos";
	import { storeToRefs } from "pinia";
	const store = useTodoStore();
	const { filteredTodos } = storeToRefs(store);
	//预期情况下面这段代码，将接受到pinia里定义的方法
	const { deleteTodo, toggleCompleted } = store; //实际情况这里是undefined
	//控制台显示没用定义的方法
	console.log(store);
	//预期接收到pinia定义的方法，实际为undefined
	console.log(deleteTodo, toggleCompleted);
</script>
<template>
	<div class="todos">
		<div
			class="todo"
			v-for="(todo, index) in filteredTodos"
			:key="todo.id">
			<check-btn
				:todo="todo"
				:checked="todo.completed"
				@click="toggleCompleted(index)" />
			<todo-content
				:content="todo.text"
				:line-through="todo.completed" />
			<del-btn @click="deleteTodo(todo)" />
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
