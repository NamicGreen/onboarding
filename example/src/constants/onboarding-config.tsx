import React from "react";

const config = {
	showBackdrop: true,
	// tipContent: ({step, lastStep, curretStepConfig, previousStep, nextStep, onSkip}) => {
	// 	return <>
	// 		<h1 onClick={nextStep}>Manual Tip content {step}</h1>
	// 		{curretStepConfig?.content}
	// 	</>
	// },
	steps: {
		1: {
			id: 'step-1',
			content: (
				<div>
					<h4>This is first div which is used for tip 1</h4>
					<img alt="" src='/favicon.ico' />
				</div>
			)
		},
		2: {
			id: 'step-5',
			content: (
				<div>
					<h4>this is imported component</h4>
				</div>
			)
		},
		3: {
			id: 'step-3',
			content: (
				<div>
					<h4>This is third tip with some content</h4>
				</div>
			)
		},
		4: {
			id: 'step-4',
			content: (
				<div>
					<h4>This is third tip with some content</h4>
				</div>
			)
		},
		5: {
			id: 'step-2',
			content: (
				<div>
					<h4>This is another tip which can be used.</h4>
				</div>
			)
		},
	}
}


export default  config;