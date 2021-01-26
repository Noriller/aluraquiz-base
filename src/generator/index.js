
class QuestionGenerator {

  constructor ( questionLoad ) {
    console.log( questionLoad );
    this.lowerBoundary = questionLoad.lowerBoundary;
    this.upperBoundary = questionLoad.upperBoundary;

    const coisa = new Addition( this.lowerBoundary, this.upperBoundary );
    const coisa2 = new Subtraction( this.lowerBoundary, this.upperBoundary );
    console.log( coisa.getQuestion() );
    console.log( coisa2.getQuestion() );
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
      "value": `${ firstValue } - ${ secondValue } = ???`,
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
      "value": `${ firstIsBigger ? firstValue : secondValue } + ${ firstIsBigger ? secondValue : firstValue } = ???`,
      "result": result,
      "answerArray": this.shuffleAnswer( answerArray )
    };
  }
}

const coisa = {
  "type": "addition",
  "lowerBoundary": 1,
  "upperBoundary": 10
};
console.log( new QuestionGenerator( coisa ) );