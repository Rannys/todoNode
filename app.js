const fs = require('fs')
const Read = require('./ReadTodo')
// const Student = require('./dev')

// console.log(Student)
Help = () => {
    console.log("add \t\t\t\t To add new todo")
    console.log("remove \t\t\t\t To remove a todo")
    console.log("list \t\t\t\t To list all todos")
    console.log("read \t\t\t\t To display a todo")
    return
}

Add = () => {
    let newTodo = {}
    let titleIndex = process.argv.findIndex(el => el === "--title")
    if(titleIndex === -1 || process.argv[titleIndex+1] === undefined){
        console.log('Options:')
        console.log('--title \t\t Title of note')
        console.log('--body \t\t\t Body of note\n')
        console.log("Missing Required Arguments: --title, --body")
        return
    }else{
        newTodo.Title = process.argv[titleIndex+1]
    }
    
    let bodyIndex = process.argv.findIndex(el => el === "--body")
    if(bodyIndex === -1 || process.argv[bodyIndex+1] === undefined){
        console.log('Options:')
        console.log('--title \t\t Title of note')
        console.log('--body \t\t\t Body of note\n')
        console.log("Missing Required Arguments: --title, --body")
        return
    }else{
        newTodo.Body = process.argv[bodyIndex+1]
    }
    // na9ra el fichier todos.json
    let todosJSON = fs.readFileSync('todos.json', 'utf8')
    //convert todos.json to JS
    let todos = JSON.parse(todosJSON)
    // Concat newTodo with the other todos
    let allTodos = todos.concat(newTodo)
    // convert todos to JSON
    let allTodosJSON = JSON.stringify(allTodos)
    // nekteb fel todos.json
    fs.writeFileSync('todos.json', allTodosJSON)

    console.log('Note Created!')
    console.log(`Title: ${newTodo.Title}`)
    // console.log("Title: " + newTodo.Title)
    console.log(`Body: ${newTodo.Body}`)
}

Remove = () => {
    let titleIndex = process.argv.findIndex(el => el === "--title")
    if(titleIndex === -1 || process.argv[titleIndex+1] === undefined){
        console.log('Options:')
        console.log("--title \t\tTitle of note")
        console.log("help \t\t\t To show help\n")
        console.log("Missing Required Arguments: --title")
        return
    }else{
        // na9raw todos.json
        let todosJSON = fs.readFileSync('todos.json', 'utf8')
        // convert it to JS
        let todos = JSON.parse(todosJSON)
        // filter todos
        let filteredTodos = todos.filter(el => el.Title !== process.argv[titleIndex+1])
        if(filteredTodos.length === todos.length){
            console.log('Note Not Found!')
            return
        }
        // convert it back to JSON
        let filteredTodosJSON = JSON.stringify(filteredTodos)
        // write it to todos.json
        fs.writeFileSync('todos.json', filteredTodosJSON)
        console.log("Note was removed")
    }
}

List = () => {
    // na9ra todos.json
    let todosJSON = fs.readFileSync('todos.json', 'utf8')
    // convert it to JS
    let todos = JSON.parse(todosJSON)
    // display array's length
    console.log(`Il y'a ${todos.length} note(s)`)
    console.log('----')
    // loop into it and console log every note (element)
    todos.forEach(el => {
        console.log(`Title: ${el.Title}`)
        console.log(`Body: ${el.Body}\n`)
    });
}



switch(process.argv[2]){
    case 'help':
        return Help()
        break;
    case 'add':
        return Add()
        break;
    case 'remove':
        return Remove()
        break;
    case 'list':
        return List()
        break;
    case 'read':
        return Read()
        break;
    default:
        return Help()
}