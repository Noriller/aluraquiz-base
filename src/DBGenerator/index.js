import db from '../../db.json';
import QuestionGenerator from '../QuestionGenerator';

export default function DBGenerator () {
  const original = JSON.parse( JSON.stringify( db ) );
  const questions = original.questions;

  const newQuestions = [];

  questions.map( ( q ) => {
    const load = q.questionLoad;
    const { mathQuestion, result, answerArray } = new QuestionGenerator( load );

    const newQuestion = {
      image: q.image,
      title: `${ q.title } ${ mathQuestion }`,
      description: q.description,
      answer: result,
      alternatives: answerArray,
    }
    
    newQuestions.push( newQuestion );

  } );

  original.questions = newQuestions;

  return original;

}
