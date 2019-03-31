const fs = require('fs');
const chalk = require('chalk');
const getNotes = () => {return 'your notes'};

const addNotes = (title,body) => {
    const notes = loadnotes();
    // console.log(notes);
    const duplicateNotes = notes.filter((note) => note.title === title);
    // console.log(duplicateNotes);
    if (duplicateNotes.length === 0) {
        notes.push ({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('new notes added');
    } else {
        console.log('notes is taken');
    }    
}

const removeNotes = (title,body) => {
    const notes = loadnotes();
    const notesToKeep = notes.filter((note) => note.title !== title);
    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green('note remove'))
    } else {
        console.log(chalk.red('not notes found'))
    }
    
}

const listNotes = () => { 
    const notes = loadnotes()
    console.log(chalk.inverse('your notes'))
    notes.forEach(note => {
      console.log(note.title);  
    });
}

const readNotes = (title) => {
    const notes = loadnotes()
    const readTo = notes.find((note)=> note.title === title);
    if (readTo) {
        console.log(chalk.inverse(readTo.title));
        console.log(readTo.body);
    } else {
        console.log(chalk.red.inverse('sorry, there isnt match data'));
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

const loadnotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } 
    catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}