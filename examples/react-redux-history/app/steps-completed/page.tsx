"use client";

export default function StepsComplete() {
	return (
		<div>
			<p>{"All steps have been completed."}</p>
			<p>{"You will be redirected back to step-1 if trying to go back."}</p>
			<p>
				{
					"Remember, all our steps depend on each other, we cannot start in the middle of the flow."
				}
			</p>
			<p>
				{
					"It doesn't matter if we press the browser back button or the one below. The middleware will take care of it :)"
				}
			</p>
			<span
				className="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded"
				onClick={() => console.log("Back ...")}
			>
				Go back
			</span>
		</div>
	);
}
