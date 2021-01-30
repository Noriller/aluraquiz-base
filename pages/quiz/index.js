/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';
import DBGenerator from '../../src/DBGenerator';

export default function QuizDaGaleraPage ( { db } ) {
  return (
    <ThemeProvider theme={db.theme}>
      <QuizScreen
        externalQuestions={db.questions}
        externalBg={db.bg}
      />
    </ThemeProvider>
  );
}

export async function getStaticProps () {
  const db = DBGenerator();
  return {
    props: { db },
    revalidate: 60 * 10 // 10 minutes
  };
}