import Home from './component/pages/Home'
import Login from './component/pages/Login'

import User from './component/pages/User'
import EditUser from './component/pages/user/EditUser'

import TimeLog from './component/pages/TimeLog'
import EditTimeLog from './component/pages/EditTimeLog'

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
        path: '/auth/login',
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
    }
];

export { navOnly };

export default route;