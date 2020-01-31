import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Links from './Links'

import { Navbar as NB } from 'react-bootstrap'

export class NavBar extends Component {

    render() {
        return (
            <NB bg="white" fixed="top" light expand="lg">
                <NB.Brand>
                    <Link to='/' className="text-dark">
                        <span className="navbar-brand" style={{ fontWeight: "400" }}>OverHours</span>
                    </Link>
                </NB.Brand>
                <NB.Toggle />
                <Links links={this.props.links} navOnlyLinks={this.props.navOnlyLinks} />
            </NB>
        )
    }
}

export default NavBar