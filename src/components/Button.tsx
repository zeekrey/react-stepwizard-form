import styled from 'styled-components';

const Button = styled.button`
  padding: 0.8rem;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 6px;
  transition: all 0.2s;

  :hover {
    border-color: #a79ba3;
    cursor: pointer;

    /* Remove black focus border in chrome */
    outline: none;
  }
`;

const SubmitButton = styled.input`
  padding: 0.8rem;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 6px;
  transition: all 0.2s;

  :hover {
    border-color: #a79ba3;
    cursor: pointer;

    /* Remove black focus border in chrome */
    outline: none;
  }
`;

export { Button, SubmitButton };
