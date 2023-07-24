import React, { useState } from 'react';

export default function Question({ question, answerHandle }) {
	const [ answer, setAnswer ] = useState(null);

	const getAnswerDisplay = (type, measure) => {
		let display;
		switch(type) {
			case 'range':
				display = <input onChange={handleAnswerChange} required type="number" min={question.measure[0]} max={question.measure[1]} name="answer" />;
				break;
			case 'options':
				display = (
					<React.Fragment>
						{
							measure.map(unit => {
								return (
									<div key={`${unit}_answer`}>
										<label htmlFor={`${unit}_answer`}>
										<div className="answer-option-unit">{unit}</div>
										<input onChange={handleAnswerChange} className="answer-option-control" required type="radio" value={unit} id={`${unit}_answer`} name="answer" />
										</label>
									</div>
								)
							})
						}
					</React.Fragment>
				)
				break;
			default: {
				display = <textarea className="answer-text" onChange={handleAnswerChange} required type="text" name="answer"></textarea>
				break;
			}
		}
		return display;
	}

	const getHelpDisplay = helpText => {
		return (
			<div className="help-text">
				{helpText}
			</div>
		)
	}

	const handleAnswerChange = ev => (setAnswer(ev.target.value));
	
	const handleAnswer = ev => {
		ev.preventDefault();
		answerHandle(answer);
	}
	return (
		<div>
			<div className="question">
				{question?.question}
			</div>
			<div>
				<form onSubmit={handleAnswer}>
					{question && getAnswerDisplay(question.type, question.measure)}
					<div className="help">
						{question?.help && getHelpDisplay(question.help)}
					</div>
					<div className="answer-button-container">
						<input className="button" type="submit" value="Add Answer" />
					</div>
				</form>
			</div>
		</div>
	)
}
