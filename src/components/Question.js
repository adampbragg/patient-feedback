import React, { useState } from 'react';
import useInterpolate from '../hooks/useInterpolate';

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
										<label htmlFor={`${unit}_answer`}>{unit}</label>
										<input onChange={handleAnswerChange} required type="radio" value={unit} id={`${unit}_answer`} name="answer" />
									</div>
								)
							})
						}
					</React.Fragment>
				)
				break;
			default: {
				display = <input onChange={handleAnswerChange} required type="text" name="answer" />
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
			{question?.question}
			<div>
				<form onSubmit={handleAnswer}>
					{question && getAnswerDisplay(question.type, question.measure)}
					{question?.help && getHelpDisplay(question.help)}
					<div>
						<input className="button" type="submit" value="Add Answer" />
					</div>
				</form>
			</div>
		</div>
	)
}
