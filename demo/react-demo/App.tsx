import React, { Suspense, useEffect } from 'react'
import {
  HashRouter as Router,
  useLocation,
  Switch,
  Route,
  Link
} from 'react-router-dom';

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
    <div className="content" skeletonx-module-id="layout-content">
      {props.children}
    </div>
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

function getSuspenseFallback() {
  const innerHtml = window.__skeleton__x__lib.renderToHtml(undefined, 'layout-content');
  const size = window.__skeleton__x__lib.getModuleSize(undefined, 'layout-content');
  return <div style={{position: 'relative', top: '-52px', ...size}} dangerouslySetInnerHTML={{__html: innerHtml}} />
}

export default function App() {

  const { path } = useLocation();
  console.log(location.hash);

  return <Layout>
    <Suspense fallback={getSuspenseFallback()}>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} />
        <Route path="/" component={Home} />
      </Switch>
    </Suspense>
  </Layout>
}