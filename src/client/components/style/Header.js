import styled from 'styled-components';
import { Fixed, Relative } from './Layout';

export const FixedHeader = styled (Fixed)`
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colorPrimary || '#7AC1C1;'};
`;

export const Content = styled (Relative)`
  max-width: 768px;
  margin: 0 auto;
  height 72px;

  @media (max-width: 300px) {
    height: 40px;
  }
`;

export const Title = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-top: 8px;
  font-family: 'Merriweather', sans-serif;
  text-shadow: 2px 2px 2px #FFFFFF;
  font-size: 30px;
  line-height: 1.0;
`;
