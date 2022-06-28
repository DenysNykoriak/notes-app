import { useEffect, useState } from "react";

export const useKeyPress = (targetKey, oneActuation = false) => {

    const [keyPressed, setKeyPressed] = useState(false);

    const handlerDown = ({key}) => {
        if(key === targetKey){
            setKeyPressed(true);
            if(oneActuation) setKeyPressed(false);
        }
    }

    const handlerUp = ({key}) => {
        if(key === targetKey){
            setKeyPressed(false);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handlerDown);
        window.addEventListener('keyup', handlerUp);

        return () => {
            window.removeEventListener('keydown', handlerDown);
            window.removeEventListener('keyup', handlerUp);
        }
    });

    return keyPressed;
}