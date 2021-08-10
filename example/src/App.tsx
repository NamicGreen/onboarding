import React, { useEffect, useState } from 'react'

import './index.css'

import OnBoarding from '@namicgreen/onboarding'
import '@namicgreen/onboarding/lib/css/onboarding.css'
import Test from './components/test'
import config from './constants/onboarding-config'

export default function App() {
	const [start, setStart] = useState(false)

	// start intro automatically
	useEffect(() => {
		setTimeout(() => {
			setStart(false)
		}, 1000)
	}, [])

	return (
		<>
			<button onClick={() => setStart(true)}>Start Intro</button>
			<OnBoarding
				id="intro-1"
				config={config}
				start={start}
				onClose={() => setStart(false)}
			/>
			<div className='main-container'>
				<div id='step-1'>Step 1</div>
				<div id='step-2'>Step 2</div>
				<div id='step-3'>Step 3</div>
				<div id='step-4'>Step 4</div>
			</div>
			<Test />
		</>
	)
}

