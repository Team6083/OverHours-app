import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { roleCode, sessionJWTName } from '../../../constant'
import { Navbar as NB, Nav } from 'react-bootstrap'

const Links = (props) => {
    const { links, navOnlyLinks } = props;

    let allLinks = [];
    allLinks.push(...links);

    navOnlyLinks.forEach((element) => {
        const { prefix, routes } = element;
        routes.forEach((r) => {
            allLinks.push({
                ...r,
                path: prefix + r.path
            });
        });
    });

    let userLogined = true;

    const linkList = allLinks.map((route, i) => {
        const { path, name, permission, hideOnNav, exact } = route;
        const renderLink = () => {
            return (
                <Nav.Item key={i}>
                    <NavLink className="nav-link" to={path} exact={exact}>{name}</NavLink>
                </Nav.Item>
            )
        }

        // Do route permission check here
        const role = roleCode.NoAuth;

        if (!hideOnNav && (!permission || permission.includes(role))) {
            return renderLink();
        } else {
            return null;
        }

    })

    const getName = () => {
        return "n/a";
    }

    const logout = () => {
        localStorage.removeItem(sessionJWTName);
        window.location.href = "/";
    }

    return (
        <Fragment>
            <NB.Collapse id="main-navbar-nav">
                <Nav className="mr-auto">
                    {linkList}
                </Nav>

                {
                    userLogined ?
                        <div id="userBar">

                            <NB.Text className="text-dark mr-2">
                                {getName()}
                            </NB.Text>
                            <NavLink to="/users/edit">
                                <span className="badge badge-success">
                                    Edit profile
                                    </span>
                            </NavLink>
                        </div>
                        :
                        null
                }
            </NB.Collapse >

            <button className="btn btn-outline-dark ml-md-2" onClick={logout}>Logout</button>
        </Fragment>
    )
}


export default Links;