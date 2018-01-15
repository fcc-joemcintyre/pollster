import styled from 'styled-components';

export const FixedFullWidth = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  background-color: ${(props) => { return props.theme.colorPrimary || '#7AC1C1'; }};
  border-bottom: 1px solid darkgray;
`;

export const RelativeCenteredBox = styled.div`
  position: relative;
  height: 80px;
  max-width: 768px;
  margin: 0 auto;

  @media (max-width: 300px) {
    height: 40px;
  }
`;

export const Title = styled.div`
  margin-top: 8px;
  font-family: 'Merriweather', sans-serif;
  text-shadow: 2px 2px 2px #FFFFFF;
  font-size: 36px;
  line-height: 1.0;

  @media (max-width: 300px) {
    font-size: 30px;
  }
`;
