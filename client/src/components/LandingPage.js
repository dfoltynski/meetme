import React from "react";
import { Link } from "react-router-dom";
import Background from "../background_landing_page_meetme.svg";
import { WelcomePage, ShowoffPage } from "./styledcomponents";
import "../App.css";
const LandingPage = () => {
    return (
        <div>
            <WelcomePage bg={Background}>
                <div className="welcome__text">
                    MEETME
                    <div className="welcome__text__shortdesc">
                        Meet people all around the world,{" "}
                        <b>if you are bored...</b>
                    </div>
                    <Link to="/register">
                        <button className="joinus__button">Join us!</button>
                    </Link>
                </div>
                <div
                    className="scrolldown_container"
                    onClick={() =>
                        document.getElementById("showoff_page").scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    <div className="scrolldown_container__circle"></div>
                </div>
            </WelcomePage>
            <ShowoffPage id="showoff_page">
                <div className="showoff_text">This is how it looks like</div>
                <div className="showoff">
                    <img
                        src="https://i.imgur.com/8xR8k4y.png"
                        className="showoff_picture"
                        alt="showoff_picture"
                    />
                    <img
                        src="https://i.imgur.com/aRsaomM.png"
                        className="showoff_picture"
                        alt="showoff_picture"
                    />
                    <img
                        src="https://i.imgur.com/2MECa7o.png"
                        className="showoff_picture"
                        alt="showoff_picture"
                    />
                    <img
                        src="https://i.imgur.com/ecUxXbB.png"
                        className="showoff_picture"
                        alt="showoff_picture"
                    />
                </div>
            </ShowoffPage>
        </div>
    );
};

export default LandingPage;
