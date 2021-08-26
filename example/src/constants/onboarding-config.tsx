import React from "react";

const TipContent: React.FC<any> = ({
	start,
	step,
	lastStep,
	curretStepConfig,
	previousStep,
	nextStep,
	onClose
}) => {
	return (
		<div>
			<div className='tipWrapper'>{curretStepConfig?.content}</div>
			<div className='tipDotsWrapper'>
				<div className='tipDots'>
					{Array(lastStep)
						.fill(0)
						.map((_, key) => (
							<span className={step === key + 1 ? 'active' : 'dot'} key={key} />
						))}
				</div>
			</div>
			{start && (
				<div className='tipFooter'>
					<button disabled={step === 1} onClick={previousStep}>
						Custom Back
					</button>
					{step !== lastStep && <button onClick={onClose}>Custom Skip</button>}
					<button onClick={step !== lastStep ? nextStep : onClose}>
						{step !== lastStep ? 'Custom Next' : 'Close'}
					</button>
				</div>
			)}
		</div>
	)
}

const config = {
	showBackdrop: true,
	tipContent: TipContent,
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