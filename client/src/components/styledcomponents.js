import styled from "styled-components";

export const Wrapper = styled.main`
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
