/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/prop-types */
import React from 'react';
import { Lottie } from '@crello/react-lottie';
import { useRouter } from 'next/router';

// import db from '../../../db.json';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';
import ResultsTopics from '../../components/ResultTopics';

import loadingAnimation from './animations/loading.json';
import { RightAnswer, WrongAnswer, TheRightAlternative } from '../../components/Icons/AnswerIcons';


function ResultWidget ( { results, questions } ) {
  const totalQuestions = questions.length;
  const rightAnswers = questions.map( q => q.answer );
  const totalScore = results.map( ( r, i ) => {
    return ( r === rightAnswers[ i ] ) ? 1 : 0;
  } ).filter( ( x ) => x ).length;

  const scoreDisplay = questions.map( ( q, i ) => (
    {
      title: q.title,
      hit: q.answer === results[ i ],
      yourAnswer: q.alternatives[ results[ i ] ],
      rightAnswer: q.alternatives[ q.answer ],
    }
  ) );

  const router = useRouter();
  const { name } = router.query;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        { resultMessage( totalQuestions, totalScore, name ) }
      </Widget.Header>

      <Widget.Content>
        <ul>
          { scoreDisplay.map( ( score, i ) => (
            <ResultsTopics
              key={ `score_for_question_${ i }` }
              title={ score.title }
              hit={ score.hit }
              index={ i + 1 }
              yourAnswer={ score.yourAnswer }
              rightAnswer={ score.rightAnswer }
            />
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function resultMessage ( totalQuestions, totalScore, name ) {
  const percentage = ( totalScore / totalQuestions );
  const percentageDisplay = Math.round( percentage * 100 );

  if ( percentage === 1 )
    return `${ name } you rock! Everything right!`;

  if ( percentage > 0.7 )
    return `${ name } you're awesome! ${ percentageDisplay }% right!`;

  if ( percentage > 0.5 )
    return `${ name } you did... alright. ${ percentageDisplay }% right!`;

  if ( percentage > 0.001 )
    return `${ name } you should study more... Only ${ percentageDisplay }% right!`;

  return `${ name }, Ow... Not even one? How's that possible?`;
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          { `Challenge ${ questionIndex + 1 } of ${ totalQuestions }` }
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'contain',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          { question.title }
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult( selectedAlternative );
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          { question.alternatives.map( ( alternative, alternativeIndex ) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            const isRightAnswer = alternativeIndex === question.answer;
            const gotItRight = isQuestionSubmited && isCorrect && isSelected;
            const gotItWrong = isQuestionSubmited && !isCorrect && isSelected;
            const showTheRightAlternative = isQuestionSubmited && !isCorrect && isRightAnswer;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={ questionId }
                  checked={ isSelected }
                  onChange={ () => setSelectedAlternative( alternativeIndex ) }
                  type="radio"
                />
                {alternative }
                {gotItRight && <RightAnswer /> }
                {gotItWrong && <WrongAnswer /> }
                {showTheRightAlternative && <TheRightAlternative /> }
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirm
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage ( { externalQuestions, externalBg } ) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[ questionIndex ];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 2000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  const quizPage = screenState === screenStates.QUIZ;
  const loadingPage = screenState === screenStates.LOADING;
  const resultPage = screenState === screenStates.RESULT;

  return (
    <QuizBackground backgroundImage={ bg }>
      <QuizContainer maxWidth={ resultPage ? '70%' : null }>
        <QuizLogo />
        { quizPage && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        { loadingPage && <LoadingWidget /> }

        { resultPage && <ResultWidget results={ results } questions={ externalQuestions } /> }
      </QuizContainer>
    </QuizBackground>
  );
}