import styled from 'styled-components';
import { common, darker } from '../css';

export const Button = styled.button`
  ${common}
  font-size: 18px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #F0F8FF;

  margin-right: 3%;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: ${darker ('#F0F8FF')};
  }
`;
