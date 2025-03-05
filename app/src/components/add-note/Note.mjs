import AddNoteForm from "./AddNoteForm.mjs";

export default class Note
{
    noteForm = new AddNoteForm();

    formData = {
        user: null,
        recording: [],
        notes: []
    }

    constructor() {
        this.getUser();
        this.form = new AddNoteForm();
    }

    getUser() {
        const form = document.getElementById('form');
        this.formData.user = form.dataset.userSub;
    }

    saveNote() {

    }

    clearNote() {
       this.noteForm.clearForm();
    }
}