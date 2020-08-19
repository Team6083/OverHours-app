import React, { } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ReactQueryConfigProvider } from 'react-query'

import NavBar from './component/layout/navbar/NavBar'
import routes, { navOnly } from './routes'
import PageRouter from './PageRouter'

const queryConfig = {
    queries: {
        refetchOnWindowFocus: false
    }
}

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <ReactQueryConfigProvider config={queryConfig}>
                    <div className="App">
                        <div className="mb-3"><NavBar links={routes} navOnlyLinks={navOnly} /></div>
                        <ToastContainer />
                        <PageRouter routes={routes} />
                    </div>
                </ReactQueryConfigProvider>
            </BrowserRouter>
        );
    }

}

export default App;
