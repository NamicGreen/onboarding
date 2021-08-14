import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Tippy from '@tippyjs/react'
import './css/onboarding.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'
import getCompositeRect from '@popperjs/core/lib/dom-utils/getCompositeRect'

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
						Back
					</button>
					{step !== lastStep && <button onClick={onClose}>Skip</button>}
					<button onClick={step !== lastStep ? nextStep : onClose}>
						{step !== lastStep ? 'Next' : 'Close'}
					</button>
				</div>
			)}
		</div>
	)
}

const OnBoarding: React.FC<any> = ({ id, config, start = false, onClose }) => {
	const [visible, setVisible] = useState(false)
	const [step, setStep] = useState(0)
	const lastConfig = useRef({})
	const lastStep = Object.keys(config.steps).length

	const rectRef: any = useRef(null)

	const nextStep = useCallback(() => {
		setStep((step) => {
			const newStep = step + 1
			if (newStep > lastStep) return step
			return newStep
		})
	}, [lastStep])

	const previousStep = useCallback(() => {
		setStep((step) => {
			const newStep = step - 1
			if (newStep < 1) return step
			return newStep
		})
	}, [])

	const onRectClick = useCallback((e: any) => {
		e.preventDefault()
		nextStep()
	}, [])

	useEffect(() => {
		if (start) {
			setStep(1)
		} else {
			setStep(0)
		}
	}, [start])

	useEffect(() => {
		setTimeout(() => {
			if (rectRef.current) {
				if (step > 0) {
					setVisible(true)
					rectRef.current.style.visibility = 'initial'
				} else {
					setVisible(false)
					rectRef.current.style.visibility = 'hidden'
				}
			}
		}, 1)
	}, [step])

	const curretStepConfig = useMemo(() => {
		const conf = config.steps[step] || {}
		if (Object.keys(conf).length === 0 && start === false) {
			return lastConfig.current
		}
		const element: any = document.getElementById(conf.id)

		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			})
			rectRef.current.style.visibility = 'initial'
			rectRef.current.style.height = element.clientHeight + 'px'
			rectRef.current.style.width = element.clientWidth + 'px'
			let position = { x: 0, y: 0 }
			try {
				if (conf.parentId) {
					console.log(document.getElementById(conf.parentId))
					position = getCompositeRect(
						element,
						document.getElementById(conf.parentId)!,
						true
					)
				} else {
					position = getCompositeRect(element, document.body, false)
				}
				rectRef.current.style.left = position.x + 'px'
				rectRef.current.style.top = position.y + 'px'
			}
			catch(e) {
				console.error(e)
			}
		}

		conf.element = element
		lastConfig.current = conf
		return conf
	}, [step, lastStep, start])

	const TipContentElement = config.tipContent ? config.tipContent : TipContent

	return (
		<React.Fragment>
			<Tippy
				placement='auto'
				reference={curretStepConfig?.element || null}
				allowHTML
				content={React.cloneElement(<TipContentElement />, {
					start,
					step,
					lastStep,
					curretStepConfig,
					previousStep,
					nextStep,
					onClose
				} as any)}
				animation='shift-toward-subtle'
				visible={visible}
			/>
			<div
				id={id}
				ref={rectRef}
				style={{ visibility: 'hidden' }}
				className={`hightlightRect ${
					config.showBackdrop ? 'withDropshadow' : ''
				}`}
				onClick={onRectClick}
			/>
		</React.Fragment>
	)
}

export default OnBoarding
