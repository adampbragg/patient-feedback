export default function Review({questions, answers, confirmationHandler}) {

	return (
		<div>
			{questions.map((question, i) => {
				return (
					<div key={i} className="review-question-answer">
						<div className="question">{question.question}</div>
						<div className="answer">You answered: {answers[i]}</div>
					</div>
				)
			})}
			<div>
				<button className="button" onClick={confirmationHandler}>Confirm your answers</button>
			</div>
		</div>
	)
}