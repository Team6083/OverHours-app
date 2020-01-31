import Home from './component/pages/Home'

const navOnly = [
    
]

const route = [
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home'
    }
];

export { navOnly };

export default route;