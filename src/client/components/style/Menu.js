import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { common } from './common';
import DropMenuImpl from './DropMenuImpl.jsx';
import SubMenuImpl from './SubMenuImpl.jsx';
import { darker } from './adjustColor';

export const MenuBar = styled.div`
  ${common}
  display: flex;
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

export const MenuFloating = styled.div`
  position: absolute;
  z-index: 20;
  top: calc(100% + 2px);
  left: ${props => (props.right ? null : 0)};
  right: ${props => (props.right ? 0 : null)};
  border: 1px solid #333333;
  border-top: transparent;
  background-color: ${props => props.theme.colorPrimary || '#7AC1C1'};

  > a {
    display: block;
    margin: 0;
    width: 100%;
    overflow: hidden;
    padding: 6px 20px;
    &:hover {
      background-color: ${props => (props.theme.colorPrimary ? darker (props.theme.colorPrimary) : darker ('#7AC1C1'))};
    }
  }
`;

export const DropMenu = styled (DropMenuImpl)`
  ${common}
  display: inline-block;
`;

export const DropMenuSpacer = styled (MenuSpacer)`
  height: 0px;
`;

export const DropMenuFloating = styled (MenuFloating)`
  top: 100%;
`;
