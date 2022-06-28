import { useMemo } from "react";

export const useNotes = (notes) => {

    const today = useMemo(() => {
        let todayDate = new Date();
        return notes.filter(note => {
            let createdDate = new Date(note.created * 1000);
    
            if(
                todayDate.getDate() === createdDate.getDate() && 
                todayDate.getMonth() === createdDate.getMonth() &&
                todayDate.getFullYear() === createdDate.getFullYear()
            ) return true;
    
            return false;
        })
    }, [notes]);

    const yesterday = useMemo(() => {
        let yesterdayDate = new Date();
        yesterdayDate.setDate(+yesterdayDate.getDate() - 1);
    
        return notes.filter(note => {
            if(today.includes(note)) return false;
    
            let createdDate = new Date(note.created * 1000);
    
            if(
                yesterdayDate.getDate() === createdDate.getDate() && 
                yesterdayDate.getMonth() === createdDate.getMonth() &&
                yesterdayDate.getFullYear() === createdDate.getFullYear()
            ) return true;
    
            return false;
        })
    }, [today, notes]);

    const week = useMemo(() => {
        let weekStartDate = new Date();
        weekStartDate.setDate(+weekStartDate.getDate() - 7);
    
        return notes.filter(note => {
            if(today.includes(note)) return false;
            if(yesterday.includes(note)) return false;
    
            let createdDate = new Date(note.created * 1000);
    
            if(
                weekStartDate.getDate() <= createdDate.getDate() && 
                weekStartDate.getMonth() <= createdDate.getMonth() &&
                weekStartDate.getFullYear() <= createdDate.getFullYear()
            ) return true;
    
            return false;
        })
    }, [yesterday, today, notes]);

    const other = useMemo(() => {
        let weekStartDate = new Date();
        weekStartDate.setDate(+weekStartDate.getDate() - 7);
    
        return notes.filter(note => {
            if(today.includes(note)) return false;
            if(yesterday.includes(note)) return false;
            if(week.includes(note)) return false;
    
            return true;
        })
    }, [week, yesterday, today, notes]);

    return {
        today,
        yesterday,
        week,
        other
    }
}