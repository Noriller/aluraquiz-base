import React from 'react';
import styled from 'styled-components';
import { RightAnswer, WrongAnswer, TheRightAlternative } from '../Icons/AnswerIcons';

const FlexColumnTitle = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2
`;
const FlexResult = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: nowrap;
  flex-grow: 1;
`;
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  
  /* &.answerBlock {
    border: dashed;
    border-width: thin;
  } */
`;
const DivMarginLeft = styled( FlexDiv )`
  display: flex;
  margin-left: 5px
`;

const ResultDiv = styled.div`
  outline: 0;
  text-decoration: none;
  color: ${ ( { theme } ) => theme.colors.contrastText };
  background-color: ${ ( { theme } ) => `${ theme.colors.primary }40` };
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${ ( { theme } ) => theme.borderRadius };
  transition: .3s;
  display: flex;
`;

// eslint-disable-next-line react/prop-types
export default function ResultsTopics ( { title, hit, index, yourAnswer, rightAnswer } ) {
  return (
    <ResultDiv>
      <FlexColumnTitle>
        <div>{ `#${ index }: ` }</div>
        <div>{ title }</div>
      </FlexColumnTitle>
      <FlexResult>
        <FlexDiv className="coxinha">
          { ( hit ?
            (
              <FlexDiv className="answerBlock">
                { yourAnswer }
                <DivMarginLeft>
                  <RightAnswer />
                </DivMarginLeft>
              </FlexDiv>
            ) : (
              <FlexDiv>
                <FlexDiv className="answerBlock">
                  { yourAnswer }
                  <DivMarginLeft>
                    <WrongAnswer />
                  </DivMarginLeft>
                </FlexDiv>
                <DivMarginLeft className="answerBlock">
                  { rightAnswer }
                  <DivMarginLeft>
                    <TheRightAlternative />
                  </DivMarginLeft>
                </DivMarginLeft>
              </FlexDiv>
            )
          ) }
        </FlexDiv>
      </FlexResult>

    </ResultDiv>
  );
}