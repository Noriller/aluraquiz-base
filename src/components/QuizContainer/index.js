import styled from 'styled-components';

const QuizContainer = styled.div`
  width: 100%;
  max-width: ${( props ) => props.maxWidth ?? '350px'};
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    max-width: 350px;
    margin: auto;
    padding: 15px;
  }
`;

export default QuizContainer;
