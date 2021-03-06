import styled from "styled-components";

export const Wrapper = styled.main`
    position: relative;
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: #f4f4f4;
`;

export const FormContainer = styled.div`
    text-align: center;
    margin: auto;
    width: 40em;
    min-height: 45em;
    -webkit-box-shadow: 0px 0px 29px -13px rgba(0, 0, 0, 0.51);
    -moz-box-shadow: 0px 0px 29px -13px rgba(0, 0, 0, 0.51);
    box-shadow: 0px 0px 29px -13px rgba(0, 0, 0, 0.51);
    background-color: white;
    border-radius: 20px;

    @media screen and (max-width: 1440px) {
        font-size: 12px;
    }

    @media screen and (max-width: 425px) {
        height: 100%;
        border-radius: 0px;
    }
`;

export const Form = styled.form`
    margin: auto;
    width: 20em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Input = styled.input`
    margin: 0.5em 0;
    padding: 0.5em 1em;
    border: 2px solid rgba(0, 0, 0, 0.22);
    border-radius: 10px;
    background-color: #fff;
    transition: 0.2s ease-in-out;

    &:focus {
        transition: 0.2s ease-in-out;
        border-color: rgba(135, 90, 229, 0.6);
        box-shadow: 0px 0px 28px -3px rgba(135, 90, 229, 0.6);
    }
`;

export const SubmitForm = styled.input`
    border-radius: 10px;
    margin: 0.5em 0;
    padding: 1em 1.5em;
    border: none;
    background-color: #875ae5;
    color: white;
    border: none;
    /* padding: 1em; */
    cursor: pointer;
    border-radius: 10px;
    font-weight: bolder;
    box-shadow: 0px 0px 28px -3px rgba(0, 0, 0, 0.25);
    transition: 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: #7440e3;
        transition: 0.2s ease-in-out;
    }
`;

export const Section = styled.section`
    margin-top: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const DashboardSection = styled.section`
    top: 0;
    cursor: default;
    position: absolute;
    margin: 1em;
    text-align: center;
    background-color: #ffffff;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 29px -13px rgba(0, 0, 0, 0.51);
    -moz-box-shadow: 0px 0px 29px -13px rgba(0, 0, 0, 0.51);
    box-shadow: 0px 0px 29px -13px rgba(0, 0, 0, 0.51);
    width: 20em;
    padding: 0.5em;
`;

export const SpecificFriendLabel = styled.button`
    background-color: rgba(0, 0, 0, 0);
    border: none;
    border-radius: 10px;
    display: flex;
    padding: 0.5em;
    margin-top: 0.2em;
    font-size: 16px;
    font-weight: bold;
    align-items: center;
    width: 100%;
    cursor: pointer;
    outline: none;
    transition: 0.3s ease-in-out;

    &:hover {
        transition: 0.3s ease-in-out;
        background-color: #dedede;
    }
`;

export const MessageContainer = styled(FormContainer)`
    width: 20em;
    height: 15em;
`;

export const FriendProfilePicture = styled.img`
    border-radius: 100px;
    width: 2.5em;
    height: 2.5em;
    object-fit: cover;
`;

export const FriendProfilePictureContainer = styled.div`
    padding: 1em;
    display: flex;
    align-items: center;
`;

export const CloseMessageBox = styled.button`
    background-color: rgba(0, 0, 0, 0);
    border: none;
    outline: none;
    color: #ffffff;
    cursor: pointer;
    font-weight: bold;
    padding: 0.5em;
    right: 0;
`;

export const LogoutButton = styled.button`
    background-color: #f54242;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    padding: 0.5em;
    color: white;
    transition: 0.3s ease-in-out;
    font-weight: bold;

    &:hover {
        transition: 0.3s ease-in-out;
        background-color: #d93c36;
    }
`;

export const PopupForm = styled.form`
    position: relative;
    background-color: #fff;
    padding: 1em;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Username = styled.input`
    display: inline-block;
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    padding: 0.5em 1em;
    width: 5em;
    height: 0.5em;
    background: #ffffff;
    border: 2px solid #875ae5;
    box-shadow: 0px 0px 28px 3px rgba(135, 90, 229, 0.25);
    border-radius: 12px;
`;

export const MeetInfoBox = styled.textarea`
    margin: 1em;
    background: #ffffff;
    border: 3px solid rgba(0, 0, 0, 0.22);
    height: 15em;
    padding: 0.5em;
    resize: none;
    width: 20em;
    border-radius: 12px;
    outline: none;
    transition: 0.2s ease-in-out;

    &:focus {
        transition: 0.2s ease-in-out;
        border: 3px solid #875ae5;
        box-shadow: 0px 0px 28px 3px rgba(135, 90, 229, 0.25);
    }
`;

export const SubmitMeet = styled.input`
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    background: #875ae5;
    box-shadow: 0px 0px 28px -3px rgba(0, 0, 0, 0.25);
    border-radius: 12px;

    border: none;
    outline: none;
    color: white;
    padding: 0.5em;
    margin: 0.3em 0;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    transition: 0.2s ease-in-out;

    &:hover {
        background-color: #7440e3;
        transition: 0.2s ease-in-out;
    }
`;

export const WelcomePage = styled.main`
    position: relative;
    text-align: center;
    display: flex;
    height: 100vh;
    background-image: url(${(props) => props.bg});
    background-size: cover;
`;

export const ShowoffPage = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;
