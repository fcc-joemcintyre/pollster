import styled from 'styled-components';
import { common } from '../css';

export const Select = styled.select`
  padding: 4px;
  ${common}
  padding-right: 20px;
  font-size: 16px;
  border-radius: 4px;
  appearance: none;
  outline: 0;
  background: url("data:image/svg+xml;utf8,
    <svg xmlns='http://www.w3.org/2000/svg' view-box='0 0 16 16' width='16' height='16' fill='%23000000'>
      <polygon points='2,4 14,4 8,12'/>
    </svg>") center right no-repeat;
`;
