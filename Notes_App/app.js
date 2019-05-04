const yargs = require('yargs');
const notes = require('./notes.js');
yargs.command ({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body : {
            describe:'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
});

yargs.command ({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'remove a title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title,argv.body);
    }
});

yargs.command ({
    command: 'list',
    describe: 'list your note',
    handler() {
        notes.listNotes();
    }
});

yargs.command ({
    command: 'read',
    describe: 'read your note',
    builder: {
        title: {
            describe: 'read the files',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title);
    }
});

yargs.parse()

