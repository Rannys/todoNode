const fs = require('fs')

Read = () => {
    let titleIndex = process.argv.findIndex(el => el === "--title")
    if(titleIndex === -1 || process.argv[titleIndex+1] === undefined){
        console.log('Options:')
        console.log("--title \t\tTitle of note")
        console.log("help \t\t\t To show help\n")
        console.log("Missing Required Arguments: --title")
        return
    }else{
        // na9ra todos.json
        let todosJSON = fs.readFileSync('todos.json', 'utf8')
        // convert it to JS
        let todos = JSON.parse(todosJSON)
        // find the todo with title
        let todo = todos.find(el => el.Title === process.argv[titleIndex+1])
        if(todo){
            console.log('Note Found:\n----')
            console.log(`Title: ${todo.Title}`)
            console.log(`Body: ${todo.Body}`)
        }else{
            console.log('Note Not Found!')
        }
    }
}

module.exports = Read
// export default Read