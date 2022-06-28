import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProfile, setAvatar, setName } from '../store/actions/userActions';
import '../styles/EditProfile.css';

export default function EditProfile() {

    const dispatch = useDispatch();

    let user = dispatch(getProfile());

    const avatarsPath = './avatars/';
    const avatars = [
        {id: 1, src: '1.png'},
        {id: 2, src: '2.png'},
        {id: 3, src: '3.png'},
        {id: 4, src: '4.png'},
        {id: 5, src: '5.png'},
        {id: 6, src: '6.png'},
        {id: 7, src: '7.png'},
        {id: 8, src: '8.png'},
        {id: 9, src: '9.png'},
        {id: 10, src: '10.png'},
        {id: 11, src: '11.png'},
        {id: 12, src: '12.png'},
        {id: 13, src: '13.png'},
        {id: 14, src: '14.png'},
        {id: 15, src: '15.png'},
        {id: 16, src: '16.png'}
    ];

    const [nameState, setNameState] = useState(user.name);
    const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
    const [inputNameInfo, setInputNameInfo] = useState({type: "default",text: ""});

    const getClassesForAvatar = (avatarID) => {
        if(avatarID === user.avatar) return "form__avatar form__avatar_active";
        if(avatarID === selectedAvatar) return "form__avatar form__avatar_selected";
        else return "form__avatar";
    }

    const submitChanges = () => {
        dispatch(setName(nameState));
        dispatch(setAvatar(selectedAvatar));
    }

    return (
        <div className="edit">
            <div className="edit__container">
                <div className="edit__transparent-backgroud">
                    <div className="edit__info">
                        <h1 className="edit__title">Edit Profile</h1>
                    </div>
                </div>
                <div className="edit__white-background">
                    <form className="edit__form">
                        <div className="form__input">
                            <label htmlFor="user-name" className="form__label">Your Name</label>
                            <input 
                                required
                                type="text" 
                                id="user-name" 
                                className="form__text-input"
                                value={nameState}
                                onChange={(e) => {
                                    if(e.target.value.length > 20) {
                                        setInputNameInfo({type: "error", text: "Your name too long"});
                                        return;
                                    }else{
                                        setInputNameInfo({type: "success", text: "Everything ok!"});
                                    }
                                    setNameState(e.target.value);
                                }}
                            />
                            {inputNameInfo.type !== "default" && 
                                <span 
                                    className={inputNameInfo.type === "success" ? "form__success" : "form__error"}
                                >{inputNameInfo.text}</span>
                            }
                        </div>
                        <h3 className="form__text">Choose Avatar:</h3>
                        <div className="form__avatars">
                            {avatars.map((avatar, index) => <img
                                className={getClassesForAvatar(avatar.id)} 
                                src={avatarsPath + avatar.src} 
                                alt={"avatar " + ++index}
                                width="210px"
                                height="210px"
                                key={index}
                                onClick={(e) => {
                                    setSelectedAvatar(avatar.id);
                                }}
                            />)}
                        </div>
                        <button 
                            type="submit"
                            className="form__button" 
                            onClick={(e) => {
                                submitChanges();
                            }}
                        >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
