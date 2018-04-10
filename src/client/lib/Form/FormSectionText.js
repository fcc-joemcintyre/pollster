import styled from 'styled-components';

export const FormSectionText = styled.div`
  font-size: ${({ theme }) => (theme && theme.fontSize && theme.fontSize[3]) || '16px'};
  font-weight: ${({ theme }) => (theme && theme.fontWeight && theme.fontWeight[0]) || 'normal'}
  margin-bottom: 10px;
`;
