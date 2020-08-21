import React from 'react';
import {NavLink } from 'react-router-dom';
import routes from '../routes';

export default function Navigation() {
    return (
        <ul>
            <li>
                <NavLink  exact
        to={routes.home}
        className="Navigation-link"
        activeClassName="Navigation-link-active">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink  exact
        to={routes.movies}
        className="Navigation-link"
        activeClassName="Navigation-link-active">
                    Movies
                </NavLink>
            </li>
        </ul>
    )
}
