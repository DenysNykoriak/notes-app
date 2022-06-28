export const getNotes = () => {
    return dispatch => {
        dispatch({type: 'GET_NOTES'});

        return JSON.parse(localStorage.getItem('notes'));
    }
}

export const createNote = (id, text) => {
    let nowUnix = Math.floor(Date.now() / 1000);
    return dispatch => {
        dispatch({type: 'CREATE_NOTE', payload: {id: id, text: text, created: nowUnix}});

        return JSON.parse(localStorage.getItem('notes'));
    }
}

export const deleteNote = (id) => {
    return dispatch => {
        dispatch({type: 'DELETE_NOTE', payload: id});

        return JSON.parse(localStorage.getItem('notes'));
    }
}

export const editNote = (id, new_text) => {
    return dispatch => {
        dispatch({type: "EDIT_NOTE", payload: {id, new_text}});

    }
}