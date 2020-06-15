import { Loadable } from '@@'

const Home = Loadable(() => import('@/pages/home'))
const Login = Loadable(() => import('@/pages/login'))

export { Home, Login }
