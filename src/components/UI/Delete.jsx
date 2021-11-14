import styled from "styled-components";

import Trash from "../../images/trash-solid.svg";

const Image = styled.img`
    width: 30px;
    cursor: pointer;
`;

export default function Delete(props) {
    return (
        <Image onClick={props.onClick} src={Trash} />
    )
}