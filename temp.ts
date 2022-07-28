// let url = 'https://gist.githubusercontent.com/alexandrtovmach/0c8a29b734075864727228c559fe9f96/raw/c4e4133c9658af4c4b3474475273b23b4a70b4af/todo-task.json'
// await fetch(url)
//     .then(response => response.json())
//     .then(getTodos => {
//         setTodos([
//             ...todos,
//             ...getTodos.map(item => {
//                 return {
//                     text: item.text,
//                     id: Math.random() * 1000,
//                     completed: item.isCompleted,
//                     edit: false,
//                     disableButtons: false,
//                     colorId: Math.floor(Math.random() * 10),
//                     // index: todos.indexOf(item),
//                 }
//             })
//         ]);

//         addCreateCountAction(getTodos.length);  //Redux

//         setCounter({
//             counterCreated: counter.counterCreated + getTodos.length,
//             counterUpdated: counter.counterUpdated,
//             counterDeleted: counter.counterDeleted,
//         });
//     });
