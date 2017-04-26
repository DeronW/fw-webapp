import {observable, computed, autorun} from 'mobx'

// let numbers = observable([1,2,3]);
// let sum = computed(()=>numbers.reduce((a,b)=>a+b,0));
//
// let disposer1 = autorun(()=>console.log(`sum:${sum.get()}`));
// let disposer2 = autorun(()=>console.log(`length:${numbers.length}`));
//
// numbers.push(4);
// disposer2();
// numbers.push(5);

class Todo{
    id = Math.random();
    @observable content;
    @observable finished = false;
    constructor(content){
        this.content = content;
    }
}

class TodoList{
    @observable todos = [];
    @computed get todoListString(){
        return this.todos.filter(todo=>!todo.finished).map((todo,i)=>`${i+1}.${todo.content}`).join('\n');
    }
}

const store = new TodoList();
store.todos.push(
    new Todo("task1"),
    new Todo("task2"),
    new Todo("task3")
);
autorun(()=>console.log(store.todoListString));
store.todos[2].finished = true;

