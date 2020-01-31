import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import NotFound from './component/layout/errPages/NotFound'
import { roleCode } from './constant'

class PageRouter extends Component {
    render() {
        const { routes, perfix } = this.props;

        return (
            <Switch>
                {routes.map((route, i) => {
                    const { path, exact, routes, permission, redirect } = route;
                    return (
                        <Route
                            key={i}
                            path={perfix ? (perfix + path) : path}
                            exact={exact}
                            render={(routeProps) => {
                                if (permission) {
                                    const role = roleCode.NoAuth;

                                    if (permission.includes(role)) {
                                        return (<route.component routes={routes} {...routeProps} />);
                                    } else {
                                        if (redirect) {
                                            if ((typeof redirect) === 'object') {
                                                const target = redirect[role] ? redirect[role] : (redirect.default ? redirect.default : "/auth/signin");
                                                return (<Redirect to={target} />);
                                            }
                                            else return (<Redirect to={redirect} />);
                                        } else {
                                            return (<Redirect to="/auth/signin" />);
                                        }
                                    }
                                } else {
                                    return (<route.component routes={routes} {...routeProps} />);
                                }
                            }}
                        />
                    );
                })}
                <Route component={NotFound}></Route>
            </Switch>
        )
    }
}

export default PageRouter;