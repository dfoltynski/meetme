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
    border: none;
    border-bottom: 1px solid black;
`;

export const Section = styled.section`
    margin-top: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const DashboardSection = styled.section`
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
    background-color: #f54842;
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
