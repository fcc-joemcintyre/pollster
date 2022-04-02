import styled from '@emotion/styled';
import { Toolbar, Typography } from '@mui/material';

export const StyledToolbar = styled (Toolbar)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 4px;
`;

export const Title = styled (Typography)`
  font-size: 30px;
  vertical-align: top;
  text-shadow: 1px 1px 1px #3333ff;
  line-height: 1.0;
  cursor: pointer;
`;
