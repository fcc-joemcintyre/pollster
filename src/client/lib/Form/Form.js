import styled from 'styled-components';
import { common } from '../css';

export const Form = styled.form`
  ${common}
  max-width: 100%;
  margin-left: ${props => props.center && 'auto'};
  margin-right: ${props => props.center && 'auto'};
`;

export const Field = styled.div`
  ${common}
  margin: 6px 0 16px 0;
  border: 1px solid darkgray;
  border-radius: 4px;

  > label {
    display: block;
    float: left;
    margin-top: -12px;
    margin-left: 4px;
    height: 16px;
    padding: 2px 5px 2px 5px;
    font-size: 14px;
    background-color: white;
    overflow: hidden;
  }

  > label + * {
    clear: left;
  }

  > input, select {
    display: block;
    margin: 12px 6px 8px 6px;
    padding: 4px 0;
    background-color: aliceblue;
    border: none;
    width: calc(100% - 20px);
  }

  > input:focus, select:focus {
    background-color: #E6F3FF;
  }
`;

export const FieldInfo = styled.div`
  background-color: #F0F0F0;
  font-size: 14px;
  padding: 3px;
  text-align: center;
  border-radius: 0 0 4px 4px;
`;

export const FieldError = FieldInfo.extend`
  color: red;
`;

export const Label = styled.label`
  ${common}
  &:after {
    content: ${props => (props.required) && '" *"'};
  }
`;
