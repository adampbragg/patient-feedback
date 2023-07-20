export default function Review({questions, answers, confirmationHandler}) {

	return (
		<div>
			<h1>Review your answers</h1>
			{questions.map((question, i) => {
				return (
					<div key={i}>
						<div className="question">{question.question}</div>
						<div className="answer">{answers[i]}</div>
					</div>
				)
			})}
			<div>
				<button className="button" onClick={confirmationHandler}>Confirm your answers</button>
			</div>
		</div>
	)
}