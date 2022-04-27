import React from 'react';

function Question(props) {
  return (
    <div className='question-field'>
      <h1 dangerouslySetInnerHTML={{ __html: props.question.question }} />
      <div className='options'>
        {props.options.map((option) => (
          <h3
            style={{
              color: props.showAnswers
                ? props.question.correct_answer === option
                  ? 'green'
                  : 'red'
                : '',
            }}
            onClick={() => props.handleClick(option)}
            key={option}
            dangerouslySetInnerHTML={{ __html: option }}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
