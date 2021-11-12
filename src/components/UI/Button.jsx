import styled from "styled-components";

export default styled.button`
    padding: 10px 5px;
    border-radius: 5px;
    background-color: ${(props) => props.bg};
    color: ${(props) => props.textColor};
    border: none;
`;