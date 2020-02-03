import Home from './component/pages/Home'
import User from './component/pages/User'
import EditUser from './component/pages/user/EditUser'

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