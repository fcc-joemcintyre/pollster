import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import AppMenuImpl from './AppMenuImpl.jsx';
import SubMenuImpl from './SubMenuImpl.jsx';
import { darker } from './adjustColor';

export const MenuBar = styled.div`
  display: flex;
  margin-top: ${props => props.mt || 0};
  margin-left: ${props => (props.right ? 'auto' : 0)};
`;

const item = css`
  position: relative;
  margin-right: 10px;
  white-space: nowrap;
  color: #333333;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: black;
  }
  &.active {
    color: black;
    font-weight: 600;
  }
`;

export const MenuItem = styled.div`
  ${item};
`;

export const SubMenu = styled (SubMenuImpl)`
  ${item};
`;

export const AppMenu = styled (AppMenuImpl)`
  postion: relative;
  top: 8px;
  left: 8px;
`;

export const MenuNavLink = styled (NavLink)`
  ${item};
  text-decoration: none;
`;

export const MenuSeparator = styled.hr`
  margin-top: ${props => props.spacing || '4px'};
  margin-bottom: ${props => props.spacing || '4px'};
`;

export const MenuSpacer = styled.div`
  position: absolute;
  top: 100%;
  left: ${props => (props.right ? null : 0)};
  right: ${props => (props.right ? 0 : null)};
  width: 100%;
  min-width: 100px;
  height: 16px;
`;

export const AppMenuSpacer = MenuSpacer.extend`
  height: 0px;
`;

export const MenuFloating = styled.div`
  position: absolute;
  zIndex: 20;
  top: calc(100% + 16px);
  left: ${props => (props.right ? null : 0)};
  right: ${props => (props.right ? 0 : null)};
  border: 1px solid #333333;
  background-color: #7AC1C1;

  > a {
    display: block;
    width: calc(100% - 20px);
    overflow: hidden;
    padding: 6px 10px;
    &:hover {
      background-color: ${darker ('#7AC1C1')};
    }
  }
`;

export const AppMenuFloating = MenuFloating.extend`
  top: 100%;
`;
