import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'

// Component
// State -- manage the component state
// Lifecycle
// UI

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))


export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            theme: 'light',
            toggleTheme: () => {
                this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }

    render() {
        // the next line is called jsx because it returns a html code
        // Babel will convert the following lines into plain JS before passing it to the browser
        // So there will be no errors in the browser
        // return React.createElement ( "div", null, "Hello World!")
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav />

                            <React.Suspense fallback={<Loading />} >
                                <Switch>
                                    <Route exact path='/' component={Popular} />
                                    <Route exact path='/battle' component={Battle} />
                                    <Route path='/battle/results' component={Results} />
                                    <Route render={() => <h1>404</h1>} />
                                </Switch>
                            </React.Suspense>
                            
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )        
    }
}

//now that we have our first React component, the next thing we need to do is render it to a DOM --> this is done by ReactDOM

// the .render method accepts two different arguments
// the first one is a React Element
// the second one is where to render to the Element to
ReactDOM.render(
    <App/>, document.getElementById('app') 
)