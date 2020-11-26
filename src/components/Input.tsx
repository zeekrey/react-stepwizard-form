import styled from 'styled-components';

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
  box-sizing: border-box;
  border-radius: 6px;
  transition: all 0.2s;

  :focus {
    border-color: #a79ba3;

    /* Remove black focus border in chrome */
    outline: none;
  }
`;

export { Input };
