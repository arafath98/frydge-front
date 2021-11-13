import styled from "styled-components";

export default styled.input`
    padding: 10px 15px;
    margin: 10px 0px;
    background-color: ${(props) => props.background};
    color: ${(props) => props.color};
    width: 100%;
    border: none;
    border-radius: 5px;

    &:focus {
        outline: none;
        background: ${(props) => props.backgroundFocused};
    }

    &::placeholder{
        color: ${(props) => props.color}
    }
`;