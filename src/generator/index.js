
class QuestionGenerator {

  constructor ( questionLoad ) {
    console.log( questionLoad );
    this.lowerBoundary = questionLoad.lowerBoundary;
    this.upperBoundary = questionLoad.upperBoundary;

    const coisa = new Addition( this.lowerBoundary, this.upperBoundary );
    console.log( coisa.getQuestion() );
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
}

class Addition extends MathOperation {
  getQuestion () {
    const firstValue = this.getRandom();
    const secondValue = this.getRandom();
    const result = firstValue + secondValue;

    return {
      "value": `${ firstValue } + ${ secondValue } = ???`,
      "result": result,
      "answerArray": {
        [ result - 2, result - 1, result, result + 1, result + 2 ]
      }
    };
  }
}

const coisa = {
  "type": "addition",
  "lowerBoundary": 1,
  "upperBoundary": 10
};
console.log( new QuestionGenerator( coisa ) );