import React, { } from 'react'
import { BrowserRouter } from 'react-router-dom'

import NavBar from './component/layout/navbar/NavBar'
import routes, { navOnly } from './routes'
import PageRouter from './PageRouter'

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <div className="mb-3"><NavBar links={routes} navOnlyLinks={navOnly} /></div>
                    <PageRouter routes={routes} />
                </div>
            </BrowserRouter>
        );
    }

}

export default App;