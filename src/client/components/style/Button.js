import styled from 'styled-components';
import { common } from './common';
import { darker } from './adjustColor';

export const Button = styled.button`
  ${common}
  type: button;
  font-size: 18px;
  padding: 6px 8px;
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

export default { Button };
