
class QuestionGenerator {

  constructor ( questionLoad ) {
    this.lowerBoundary = questionLoad.lowerBoundary;
    this.upperBoundary = questionLoad.upperBoundary;

    switch ( questionLoad.type ) {
      case 'addition':
        this.question = new Addition( this.lowerBoundary, this.upperBoundary );
        break;
      case 'subtraction':
        this.question = new Subtraction( this.lowerBoundary, this.upperBoundary );
        break;
      case 'multiplication':
        this.question = new Multiplication( this.lowerBoundary, this.upperBoundary );
        break;
      case 'division':
        this.question = new Division( this.lowerBoundary, this.upperBoundary );
        break;
      default:
        throw new Error( 'Something went wrong.' );
    }

    return this.question.getQuestion();
  }
}

class MathOperation {
  constructor ( lowerBoundary, upperBoundary ) {
    this.lowerBoundary = lowerBoundary;
    this.upperBoundary = upperBoundary;
    if ( new.target === MathOperation ) {
      throw new TypeError( "Cannot construct MathOperation instances directly" );
    }
  }

  getRandom () {
    const min = this.lowerBoundary;
    const max = this.upperBoundary;
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }

  getQuestion () {
    throw new Error( 'You have to implement the method do something!' );
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
    const resultSpreader = ( result % 2 === 0 ) ? 2 : 1;
    const answerArray = [
      result - resultSpreader * 2,
      result - resultSpreader,
      result,
      result + resultSpreader,
      result + resultSpreader * 2
    ]

    return {
      "value": `${ firstValue } + ${ secondValue } = ???`,
      "result": result,
      "answerArray": this.shuffleAnswer( answerArray )
    };
  }
}

class Subtraction extends MathOperation {
  getQuestion () {
    const firstValue = this.getRandom();
    const secondValue = this.getRandom();
    const firstIsBigger = firstValue >= secondValue ? true : false;
    const result = firstIsBigger ? firstValue - secondValue : secondValue - firstValue;
    const resultSpreader = ( result % 2 === 0 ) ? 2 : 1;
    const answerArray = [
      result - resultSpreader * 2,
      result - resultSpreader,
      result,
      result + resultSpreader,
      result + resultSpreader * 2
    ];

    return {
      "value": `${ firstIsBigger ? firstValue : secondValue } - ${ firstIsBigger ? secondValue : firstValue } = ???`,
      "result": result,
      "answerArray": this.shuffleAnswer( answerArray )
    };
  }
}

class Multiplication extends MathOperation {
  getQuestion () {
    const firstValue = this.getRandom();
    const secondValue = this.getRandom();
    const result = firstValue * secondValue;
    const resultSpreader = ( result % 2 === 0 ) ? 2 : 1;
    const answerArray = [
      result - resultSpreader * 2,
      result - resultSpreader,
      result,
      result + resultSpreader,
      result + resultSpreader * 2
    ];

    return {
      "value": `${ firstValue } * ${ secondValue } = ???`,
      "result": result,
      "answerArray": this.shuffleAnswer( answerArray )
    };
  }
}

class Division extends MathOperation {
  getQuestion () {
    const firstValue = this.getRandom();
    const secondValue = this.getRandom() * firstValue;
    const result = secondValue / firstValue;
    const resultSpreader = ( result % 2 === 0 ) ? 2 : 1;
    const answerArray = [
      result - resultSpreader * 2,
      result - resultSpreader,
      result,
      result + resultSpreader,
      result + resultSpreader * 2
    ];

    return {
      "value": `${ secondValue } / ${ firstValue } = ???`,
      "result": result,
      "answerArray": this.shuffleAnswer( answerArray )
    };
  }
}
