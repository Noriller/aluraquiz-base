
export default class QuestionGenerator {

  constructor ( questionLoad ) {
    this.lowerBoundary = questionLoad.lowerBoundary;
    this.upperBoundary = questionLoad.upperBoundary;
    this.limiter = questionLoad.limiter || null;

    switch ( questionLoad.type ) {
      case 'addition':
        this.question = new Addition( this.lowerBoundary, this.upperBoundary );
        break;
      case 'subtraction':
        this.question = new Subtraction( this.lowerBoundary, this.upperBoundary );
        break;
      case 'multiplication':
        this.question = new Multiplication( this.lowerBoundary, this.upperBoundary, this.limiter );
        break;
      case 'division':
        this.question = new Division( this.lowerBoundary, this.upperBoundary, this.limiter );
        break;
      default:
        throw new Error( 'Something went wrong.' );
    }

    return this.question.getQuestion();
  }
}

class MathOperation {
  constructor ( lowerBoundary, upperBoundary, limiter ) {
    this.lowerBoundary = lowerBoundary;
    this.upperBoundary = upperBoundary;
    this.limiter = limiter || null;
    if ( new.target === MathOperation ) {
      throw new TypeError( "Cannot construct MathOperation instances directly" );
    }
  }

  getRandom ( min = this.lowerBoundary, max = this.upperBoundary ) {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }

  getQuestion () {
    throw new Error( 'You have to implement the method do something!' );
  }

  getResultIndex ( result, array ) {
    return array.indexOf( result );
  }

  getAnswerArray ( result ) {
    const resultSpreader = new Set();
    resultSpreader.add( 0 );
    while ( resultSpreader.size < 5 ) {
      resultSpreader.add( this.randomResultSpreader( result, resultSpreader ) );
    }

    const spreaderArray = [ ...resultSpreader ];

    const answerArray = [
      result - spreaderArray[ 1 ],
      result - spreaderArray[ 2 ],
      result,
      result + spreaderArray[ 3 ],
      result + spreaderArray[ 4 ]
    ];
    const shuffledAnswer = this.shuffleAnswer( answerArray );
    const resultIndex = this.getResultIndex( result, shuffledAnswer );

    return { resultIndex, shuffledAnswer };
  }

  randomResultSpreader ( result, resultSpreader ) {
    const newTry = this.getRandom( Math.floor( result / 10 ), Math.floor( result / 2 ) );
    return this.newNumberOrIncrement( resultSpreader, newTry );
  }

  newNumberOrIncrement ( resultSpreader, newTry ) {
    return resultSpreader.has( newTry ) ? this.newNumberOrIncrement( resultSpreader, newTry + 1 ) : newTry;
  }

  shuffleAnswer ( array ) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while ( 0 !== currentIndex ) {
      randomIndex = Math.floor( Math.random() * currentIndex );
      currentIndex -= 1;
      temporaryValue = array[ currentIndex ];
      array[ currentIndex ] = array[ randomIndex ];
      array[ randomIndex ] = temporaryValue;
    }
    return array;
  }
}

class Addition extends MathOperation {
  getQuestion () {
    const firstValue = this.getRandom();
    const secondValue = this.getRandom();
    const result = firstValue + secondValue;
    const { resultIndex, shuffledAnswer } = this.getAnswerArray( result );

    return {
      "mathQuestion": `${ firstValue } + ${ secondValue } = ???`,
      "result": resultIndex,
      "answerArray": shuffledAnswer
    };
  }

}

class Subtraction extends MathOperation {
  getQuestion () {
    const firstValue = this.getRandom();
    const secondValue = this.getRandom();
    const firstIsBigger = firstValue >= secondValue ? true : false;
    const result = firstIsBigger ? firstValue - secondValue : secondValue - firstValue;
    const { resultIndex, shuffledAnswer } = this.getAnswerArray( result );

    return {
      "mathQuestion": `${ firstIsBigger ? firstValue : secondValue } - ${ firstIsBigger ? secondValue : firstValue } = ???`,
      "result": resultIndex,
      "answerArray": shuffledAnswer
    };
  }
}

class Multiplication extends MathOperation {
  getQuestion () {
    const firstValue = this.getRandom();
    const secondValue = this.limiter ? this.getRandom( this.lowerBoundary, this.limiter ) : this.getRandom();
    const result = firstValue * secondValue;
    const { resultIndex, shuffledAnswer } = this.getAnswerArray( result );

    return {
      "mathQuestion": `${ firstValue } * ${ secondValue } = ???`,
      "result": resultIndex,
      "answerArray": shuffledAnswer
    };
  }
}

class Division extends MathOperation {
  getQuestion () {
    const firstValue = this.limiter ? this.getRandom( this.lowerBoundary, this.limiter ) : this.getRandom();
    const secondValue = this.getRandom() * firstValue;
    const result = secondValue / firstValue;
    const { resultIndex, shuffledAnswer } = this.getAnswerArray( result );

    return {
      "mathQuestion": `${ secondValue } / ${ firstValue } = ???`,
      "result": resultIndex,
      "answerArray": shuffledAnswer
    };
  }
}