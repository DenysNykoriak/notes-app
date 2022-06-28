import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {


    return (
        <div className="home">
            <div className="home__container">
                <div className="home__transparent-backgroud">
                    <div className="home__info">
                        <h1 className="home__title">New Notes</h1>
                        <h3 className="home__subtitle">
                            Welcome to "New Notes". <br/>
                            Your busy life deserves this.
                            You can use this app to stay organised and get more done
                            Start writing down the important things in your life
                        </h3>
                        <div className="home__buttons">
                            <button className="home__start-button"><Link 
                                to="/notes"
                                className="home__start-link"
                            >Start</Link></button>
                            <button className="home__edit-button"><Link 
                                to="/edit"
                                className="home__edit-link"
                            >Edit my account</Link></button>
                        </div>
                    </div>
                </div>
                <footer className="home__white-background">
                    <div className="footer__author">All site rights belong to N. Denys</div>
                </footer>
            </div>
        </div>
    )
}
