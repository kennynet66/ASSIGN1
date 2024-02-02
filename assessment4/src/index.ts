// Load the HTML Elements
let noteForm = document.querySelector('.note-form') as HTMLFormElement;
let noteTitle = document.querySelector('#note-title') as HTMLInputElement;
let note = document.querySelector('#note') as HTMLInputElement;
let displayNotes = document.querySelector('#display') as HTMLDivElement;
let createButton = document.querySelector('.title') as HTMLButtonElement;
// Load the errors
let noteError = document.querySelector('.error') as HTMLDivElement;

interface note {
    id:number;
    title: string;
    note: string;
}

let noteArr: note[] = [];

// Load the local storage
window.onload = () => {
    let data = save.getNotes();
    
    if (data) {
        data.forEach((el:any) => {
            noteArr.push(el)
        });
        display.displayNote();
    } else {
        display.displayNote();
    }
}

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let verify = 
        noteTitle.value.trim() != "" &&
        note.value.trim() != ""

    console.log(verify);
    

    if(verify) {
        let newNote = {
            id: noteArr.length + 1,
            title: noteTitle.value.trim(),
            note: note.value.trim()
        }
        note.value ="";
        noteTitle.value = "";
        noteArr.push(newNote);
        save.saveNote();
        display.displayNote();
    } else {
        alert("Please fill in all the notes fields")
    }
});

class localSaves {
    saveNote() {
        localStorage.setItem('notifyNote', JSON.stringify(noteArr));
    }
    getNotes() {
        let data:any = localStorage.getItem('notifyNote')
        return JSON.parse(data)
    }
}

let save = new localSaves;

class displays extends localSaves {
    displayNote () {
        displayNotes.textContent = "";
        if (noteArr.length >= 1) {
            noteArr.forEach ((note, index) => {
                let card = document.createElement('div');
                card.className = 'card';
                
                let noteTitle = document.createElement('h4');
                noteTitle.className = 'note-title';
                noteTitle.textContent = note.title

                let noteId = document.createElement('p');
                noteId.textContent = `ID: ${note.id}`

                let noteCont = document.createElement('p');
                noteCont.textContent = note.note;

                let buttons = document.createElement('div');
                buttons.className = 'buttons';
                
                let del = document.createElement('div');
                del.className = 'delete';
                del.textContent = "Delete"
                del.addEventListener('click',() => {
                    this.deleteNote(index);
                })
                
                let edit = document.createElement('div')
                edit.className = "edit";
                edit.textContent = "Edit"
                edit .addEventListener('click',()=> {
                    this.updateNote(index);
                })
                
                buttons.appendChild(del);
                buttons.appendChild(edit);
                
                card.appendChild(noteTitle);
                card.appendChild(noteId);
                card.appendChild(noteCont);
                card.appendChild(buttons)
                
                displayNotes.appendChild(card);
            });
        } else {
            displayNotes.textContent = "You have no Notes"
        }
    }

    deleteNote(note:number) {
        noteArr.splice(note,1);
        this.saveNote();
        this.displayNote();
    }

    updateNote(index:number) {
        let selectedNote = noteArr[index]
        console.log(selectedNote);
        
        noteTitle.value = selectedNote.title
        note.value = selectedNote.note
        if (selectedNote) {
            let updatedNote = {
                id: selectedNote.id,
                title: selectedNote.title,
                note: selectedNote.note
            }
            noteArr[index] = updatedNote; // Update the note at the specified index
        }        
    }
}

let display = new displays;