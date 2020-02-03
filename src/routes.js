import Home from './component/pages/Home'
import User from './component/pages/User'

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
    }
];

export { navOnly };

export default route;