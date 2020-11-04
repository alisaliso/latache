import React, { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import styled from 'styled-components';

const borderRadius = "6px";
const borderSmalRadius = "5px";
const backgroundColor = "white";
const distance = "4px";
const stripsSize = "4px"; /// Controls the size of the stripes
const stripsAngle = "45deg";
const defaultBoardColor = "221,221,221";

const StyledBoard = styled.div.attrs(props => ({
  primaryColor: props.primaryColor || defaultBoardColor,
}))`
  border: 1px solid rgba(${props => props.primaryColor}, 1);
  border-radius: ${borderRadius};
  margin-bottom: 10px;
  position: relative;

  &::after {
    border-radius: ${borderRadius};
    content: "";
    opacity: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    left: ${distance};
    top: ${distance};
    z-index: -1;
    background-size: ${stripsSize} ${stripsSize};
    background-color: rgba(${props => props.primaryColor}, 1);
    background-image: linear-gradient(
      ${stripsAngle},
      ${backgroundColor} 25%,
      transparent 25%,
      transparent 50%,
      ${backgroundColor} 50%,
      ${backgroundColor} 75%,
      transparent 75%,
      transparent
    );
    transition: 0.3s;
    transition-delay: 0.3s;
  }
`;

const BoardHead = styled.div.attrs(props => ({
  primaryColor: props.primaryColor || defaultBoardColor,
}))`
  background-color: rgba(${props => props.primaryColor}, 1);
  padding: 8px;
  border-top-left-radius: ${borderSmalRadius};
  border-top-right-radius: ${borderSmalRadius};
  font-size: 12px;
  font-weight: 800;
  color: darken(rgba(${props => props.primaryColor}), 100%);
`;

const BoardHeadInput = styled.input.attrs(props => ({
  primaryColor: props.primaryColor || defaultBoardColor,
}))`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  background-color: rgba(${props => props.primaryColor}, 1);
  padding: 8px;
  border: none;
  margin: 0;
  border-top-left-radius: ${borderSmalRadius};
  border-top-right-radius: ${borderSmalRadius};
  font-size: 12px;
  font-weight: 800;
  color: darken(rgba(${props => props.primaryColor}), 100%);
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(${defaultBoardColor});
  margin: 12px 0;
`;

const StyledColor = styled.div.attrs(props => ({
  color: props.color || defaultBoardColor,
}))`
  width: 14px;
  height: 14px;
  cursor: pointer;
  background-color: rgb(${props => props.color});
  border-radius: 3px;
  margin-right: 5px;
  margin-bottom: 5px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const Row = styled.div`
  display: flex;
`;
const Tag = () => (
  <div>Tag</div>
);

function Color({ color, setColor }) {
  return (<StyledColor color={color} onClick={() => setColor(color)}></StyledColor>)
};

const BoardContent = styled.div.attrs(props => ({
  primaryColor: props.primaryColor || defaultBoardColor,
}))`
  padding: 8px;
  background-color: ${backgroundColor};
  border-bottom-left-radius: ${borderSmalRadius};
  border-bottom-right-radius: ${borderSmalRadius};
`;
const tags = [{ title: "Home", color: '' }, { title: "Work", color: '' }];
const colors = ["242,170,170", "224,244,245", "221,221,221", "250,190,167", "243,230,227", "241,197,197", "195,174,214", "223,211,195", "250,240,175", "160,193,184", "246,222,246", "255,236,199"];

function EditingBoard() {
  const [color, setColor] = useState(defaultBoardColor);

  return (
    <StyledBoard primaryColor={color}>
      <BoardHeadInput primaryColor={color} placeholder="Board name" type="text" />
      <BoardContent>
        {tags?.map((tag, index) => (
          <Tag key={index} data={tag} />
        ))}
        {tags.length > 0 && colors.length > 0 &&
          <Line></Line>
        }
        <Row>
          {colors?.map((color, index) => (
            <Color key={index} color={color} setColor={setColor} />
          ))}
        </Row>
      </BoardContent>
    </StyledBoard>
  );
}

function Board({ board, type = 'DEFAULT' }) {
  return (
    <>
      {type === 'NEW_BOARD' &&
        <EditingBoard />
      }
      {type === 'DEFAULT' &&
        <DefaultBoard board={board} />
      }
    </>
  )
}

const DefaultBoard = ({ board }) => (
  <StyledBoard primaryColor={board.color}>
    <BoardHead primaryColor={board.color}>{board.title}</BoardHead>
    <BoardContent>
      {board.tasks?.map((task, index) => (
        <Task task={task} key={index} />
      ))}
      <AddTask color={board.color} />
    </BoardContent>
  </StyledBoard>
);

export default Board;
