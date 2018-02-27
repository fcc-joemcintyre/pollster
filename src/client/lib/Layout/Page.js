import styled from 'styled-components';

const Page = styled.div`
  width: 100%;
`;

const PageContent = styled.div`
  max-width: ${props => props.maxWidth || '768px'};
  margin: 0 auto;
  padding: 100px 0px 16px 0px;
  overflow: auto;
`;

export { Page, PageContent };
