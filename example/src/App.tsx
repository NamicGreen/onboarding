import React, { useEffect, useState } from 'react'

import './index.css'

import OnBoarding from '@namicgreen/onboarding'
import '@namicgreen/onboarding/src/css/onboarding.css'
import Test from './components/test'
import config from './constants/onboarding-config'

import { Box } from '@material-ui/core'
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { orange, green } from '@material-ui/core/colors'

const orangeTheme = createTheme({
	palette: {
		secondary: {
			main: orange[500]
		}
	}
})

const greenTheme = createTheme({
	palette: {
		secondary: {
			main: green[500]
		}
	}
})

export default function App() {
	const [themeName, setThemeName] = useState('orage')
	return (
		<ThemeProvider theme={themeName === 'orage' ? orangeTheme : greenTheme}>
			<label>
				Make green theme : <input
					type='checkbox'
					checked={themeName === 'green'}
					onChange={() =>
						setThemeName((name) => (name === 'orage' ? 'green' : 'orage'))
					}
				/>
			</label>
			<ThemeTest />
			<br />
			<AppContent />
		</ThemeProvider>
	)
}

const useStyles = makeStyles(theme => ({
	boxClass: {
		backgroundColor: theme.palette.secondary.main,
	}
})
);

const ThemeTest = () => {
	const classes = useStyles()
	return <Box width="40px" height="40px" className={classes.boxClass} />
}

const useStylesApp = makeStyles(theme => ({
	"@global": {
		'.tippy-content': {
			backgroundColor: theme.palette.secondary.main,
		},
		'.tippy-arrow': {
			color: theme.palette.secondary.main,
		},
		'.tipFooter': {
			backgroundColor:'red'
		},
		'.hightlightRect': {
			border: '3px solid yellow'
		},
		'.tipDotsWrapper': {
			backgroundColor: 'green'
		},
		'.tipDots': {
			color: 'violet'
		}
	}
})
);

const AppContent = () => {
	const [start, setStart] = useState(false)
	useStylesApp()
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
				id='intro-1'
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
