import Home from './component/pages/Home'
import Login from './component/pages/Login'

import User from './component/pages/user/User'
import EditUser from './component/pages/user/EditUser'

import TimeLog from './component/pages/timeLog/TimeLog'
import EditTimeLog from './component/pages/timeLog/EditTimeLog'

import Leaderboard from './component/pages/board/Leaderboard'

const navOnly = [

]

const route = [
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home'
    },
    {
        path: '/login',
        component: Login,
        name: 'Login',
        hideOnNav: true
    },
    {
        path: '/timeLogs',
        exact: true,
        component: TimeLog,
        name: 'TimeLog'
    },
    {
        path: '/timeLogs/edit/:id',
        exact: true,
        component: EditTimeLog,
        name: 'Edit TimeLog',
        hideOnNav: true
    },
    {
        path: '/board/leaderboard',
        exact: true,
        component: Leaderboard,
        name: 'Leaderboard'
    },
    {
        path: '/users',
        exact: true,
        component: User,
        name: 'User'
    },
    {
        path: '/users/edit/:id',
        exact: true,
        component: EditUser,
        name: 'Edit User',
        hideOnNav: true
    },
];

export { navOnly };

export default route;