import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const DropMenuIcon = ({ onClick }) => (
  <Container onClick={onClick}>
    <Bar />
    <Bar />
    <Bar />
  </Container>
);

export default DropMenuIcon;

DropMenuIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const Container = styled.div`
  height: 22px;
  width: 22px;
  background-color: transparent;
`;

const Bar = styled.div`
  height: 2px;
  width: 16px;
  margin: 3px 0px 0px 2px;
  border: 0px;
  border-radius: 1px;
  background-color: black;

  &:first-child {
    margin-top: 4px;
  }
`;
