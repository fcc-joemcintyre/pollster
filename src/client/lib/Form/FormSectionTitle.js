import styled from 'styled-components';

export const FormSectionTitle = styled.div`
  font-size: ${({ theme }) => (theme && theme.fontSize && theme.fontSize[3]) || '16px'};
  font-weight: ${({ theme }) => (theme && theme.fontWeight && theme.fontWeight[1]) || 'bold'};
  margin-top: 20px;
  margin-bottom: 10px;
`;
