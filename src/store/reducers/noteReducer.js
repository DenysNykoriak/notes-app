const GET_NOTES = "GET_NOTES";
const CREATE_NOTE = "CREATE_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const EDIT_NOTE = "EDIT_NOTE";

const localStorageNotes = localStorage.getItem('notes');

const startDates = {
    3: () => Math.floor(Date.now() / 1000),
    2: () => {
        let now = new Date();

        return Math.floor(now.setDate(now.getDate() - 1) / 1000);
    },
    1: () => {
        let now = new Date();

        return Math.floor(now.setDate(now.getDate() - 2) / 1000);
    },
    0: () => {
        let now = new Date();

        return Math.floor(now.setMonth(now.getMonth() - 1) / 1000);
    },
}

const initialState = {
    notes: (!localStorageNotes) ? [
        // {id: 3, text: 'Test Note', created: startDates[3]()},
        // {id: 2, text: 'Test Note', created: startDates[2]()},
        // {id: 1, text: 'Test Note', created: startDates[1]()},
        // {id: 0, text: 'Test Note', created: startDates[0]()},
    ] : JSON.parse(localStorageNotes)
}

if(!localStorageNotes) localStorage.setItem('notes', JSON.stringify(initialState.notes));

export const noteReducer = (state = initialState, action) => {
    switch(action.type){
        case(GET_NOTES):

            return state;
        case(CREATE_NOTE):
            state.notes = [action.payload, ...state.notes]
            localStorage.setItem('notes', JSON.stringify(state.notes));

            return state;
        case(DELETE_NOTE):
            state.notes = state.notes.filter(note => note.id !== action.payload);
            localStorage.setItem('notes', JSON.stringify(state.notes));

            return state;
        case(EDIT_NOTE):
            //id, new_text
            let editedNote = state.notes.find(note => note.id === action.payload.id);
            let noteIndex = state.notes.indexOf(editedNote);

            if(noteIndex >= 0){
                editedNote.text = action.payload.new_text;

                state.notes.splice(noteIndex, 1, editedNote);
                localStorage.setItem('notes', JSON.stringify(state.notes));
            }

            return state;
        default:
            return state;
    }
}