import React, { Suspense, useEffect } from 'react'
import {
  HashRouter as Router,
  useLocation,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import SkeletonContainer, { SkeletonSupspense } from './components/SkeletonContainer';

const Home = React.lazy(() => import('./pages/Home'));
const Users = React.lazy(() => import('./pages/Users'));
const About = React.lazy(() => import('./pages/About'));

// import Home from './pages/Home'
// import Users from './pages/Users'
// import About from './pages/About'

const Layout: React.FC<{}> = (props) => {
  return <div className="layout">
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/">React Demo</Link>
      <Link to="/users">Users</Link>
    </div>
    <SkeletonContainer className="content" moduleId="layout-content">
      {props.children}
    </SkeletonContainer>
    <div className="footer">
      <div>
        <div><Link to="/about">About</Link></div>
        <div><Link to="/about">About</Link></div>
        <div><Link to="/about">About</Link></div>
      </div>
      <div>
        <div><Link to="/about">About</Link></div>
        <div><Link to="/about">About</Link></div>
        <div><Link to="/about">About</Link></div>
      </div>
    </div>
  </div>
}

export default function App() {

  const { path } = useLocation();

  return <Layout>
    <Suspense fallback={<SkeletonSupspense moduleId="layout-content" style={{top: -52}} />}>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} />
        <Route path="/" component={Home} />
      </Switch>
    </Suspense>
  </Layout>
}