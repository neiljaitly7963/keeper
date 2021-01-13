import styled from 'styled-components';

const getWebWidth = (props) => {
  if (props.extrabig) {
    return '100%';
  }
  if (props.big) {
    return '235px';
  }
  if (props.medium) {
    return '206px';
  }
  if (props.small) {
    return '128px';
  }
  if (props.extrasmall) {
    return '80px';
  }
  return '100px';
};

const getMobileWidth = (props) => {
  if (props.extrabig) {
    return '100%';
  }
  if (props.big) {
    return '9em';
  }
  if (props.medium) {
    return '7.5em';
  }
  if (props.small) {
    return '4em';
  }
  if (props.extrasmall) {
    return '3em';
  }
  return '8em';
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

  @media (min-width: 1000px) {
    width: ${getWebWidth};
  }
  @media (max-width: 1000px) {
    width: ${getMobileWidth};
  }
`;

export default StyledInput;
