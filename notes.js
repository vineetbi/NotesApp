const fs = require('fs')
const chalk = require('chalk')

const addNote = (title ,body)=> {
    const notes= loadNotes()
    const duplicateNote = notes.find((note)=> note.title === title)

    if(!duplicateNote){
        notes.push({
            title : title,
            body : body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }
    else{
        console.log(chalk.red.inverse('Note Title taken'))
    }
}
const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const loadNotes = ()=>{

    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }

}

const removeNote = (title)=>{
    const notes = loadNotes()
    const finalNotes = notes.filter((note)=> note.title != title)
    if(finalNotes.length === notes.length){
        console.log(chalk.red.inverse('Note Title not present'))
    }
    else{
        saveNotes(finalNotes)
        console.log(chalk.green.inverse('Note Removed!'))
    }

}
const listNote = ()=>{
    const notes= loadNotes()
    if(notes.length>0){
        console.log(chalk.green.inverse('List of Notes'))
        notes.forEach((note)=>{
            console.log(note.title)
        })
    }
    else console.log(chalk.red.inverse('Empty List'))
}
const readNote = (title)=>{
    const notes = loadNotes()
    const note= notes.find((note)=> note.title===title)
    if(!note){
        console.log(chalk.red.inverse('No note found!'))
    }
    else{
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
}
module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNote : listNote,
    readNote : readNote
}