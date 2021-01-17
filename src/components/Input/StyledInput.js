import styled from 'styled-components';

const getWidth = (props) => {
  if (props.extrabig) {
    return '100%';
  }
  if (props.big) {
    return '50%';
  }
  if (props.medium) {
    return '40%';
  }
  if (props.small) {
    return '27%';
  }
  if (props.extrasmall) {
    return '17%';
  }
  return '30%';
};

const StyledInput = styled.input`
  outline: none;
  height: 20px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  ::placeholder {
    color: rgba(0, 0, 0, 0.3);
    font-size: 14px;
  }
  width: ${getWidth};
`;

export default StyledInput;
