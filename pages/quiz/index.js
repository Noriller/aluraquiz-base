/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';
import DBGenerator from '../../src/DBGenerator';

export default function QuizDaGaleraPage ( { db, time } ) {
  return (
    <ThemeProvider theme={ db.theme }>
      <QuizScreen
        externalQuestions={db.questions}
        externalBg={ db.bg }
        time={ time }
      />
    </ThemeProvider>
  );
}

export async function getStaticProps () {
  const db = DBGenerator();
  const time = new Date().getTime();
  return {
    props: { db, time },
    revalidate: 60 * 10 // 10 minutes
  };
}