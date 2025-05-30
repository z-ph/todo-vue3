<script>
import todoContent from "./todo-content.vue";
import checkBtn from "./check-btn.vue";
import delBtn from "./del-btn.vue";
export default {
    components: {
        checkBtn,todoContent,delBtn
    },
    name: "todo-list",
    props: {
        todos: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        deleteTodo(index) {
            this.$emit("delete-todo", index);
        },
        toggle(index) {
            this.$emit("toggle", index);
        },
        Click() {
            console.log('click')
        }
    },
};
</script>
<template>
    <div class="todos">
        <div
            class="todo"
            v-for="(todo, index) in todos"
            :key="index"
        >
            <check-btn
                :todo="todo"
                :checked="todo.completed"
                @click="toggle(index)"
            />
            <todo-content
            :content="todo.text"
            :line-through="todo.completed"
            />
            <del-btn
            @click="deleteTodo(index)"
            />
        </div>
    </div>
</template>
<style scoped>

.todos {
    margin-top:20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.todo {
    position: relative;
    max-width: 400px;
    width: 100%;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 20px;
    /* border-left: none; */
}
.todo > * {
    display: inline-block;
    vertical-align: bottom;
}

</style>
