import './App.css';
import ErrorPage from './pages/ErrorPage';
import Contacts from './components/Contacts';
import Customer from './components/Customer';
import Customers from './components/Customers';
import mbLogo from './assets/mb-logo.svg';

// Importing components and functions from 'react-router-dom' for routing
import {
  NavLink,
  Outlet,
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";

// Defining the root component for the entire application
const Root = () => {
  return (
    <Routes>
      {/* Route for the root path */}
      <Route path='/' element={(
        <>
          {/* Sidebar navigation */}
          <div id="app-sidebar" className='p-3'>
            {/* Logo and title */}
            <NavLink to="/" className="link-body-emphasis text-decoration-none text-center">
              <b className="fs-5">MB-Challenge</b>
            </NavLink>
            <hr />
            {/* Navigation links */}
            <nav className='mb-auto overflow-y-auto d-flex flex-column flex-grow-1'>
              <ul className="nav nav-pills flex-column">
                {/* NavLink for 'Customers' page */}
                <li className="nav-item">
                  <NavLink to='customers' className="nav-link link-body-emphasis" >
                    Customers
                  </NavLink>
                </li>
                {/* NavLink for 'Contacts' page */}
                <li>
                  <NavLink to='contacts' className="nav-link link-body-emphasis">
                    Contacts
                  </NavLink>
                </li>
              </ul>
            </nav>
            <hr />
            {/* External link to Mad Booster website */}
            <div className="d-flex flex-shrink-0">
              <a href="https://madbooster.com" className="d-flex align-items-center link-body-emphasis text-decoration-none"
                target='_blank'
                rel='noopener noreferrer'>
                <img src={mbLogo} alt="" width="32" height="32" className="rounded-circle me-2" />
                <strong>Mad Booster</strong>
              </a>
            </div>
          </div>
          {/* Divider and main content area */}
          <div className="app-divider app-vr"></div>
          <main>
            {/* Outlet for rendering child components based on the current route */}
            <Outlet />
          </main>
        </>
      )}
      >
        {/* Default content for the root path */}
        <Route index element={(
          <div className='m-5'>
            <h1 className='fw-bold'>MB-Challenge</h1>
            <p className="fs-3">Welcome to Mad Booster&apos;s recruit challenge!</p>
            <p><i>Add instructions here</i></p>
          </div>
        )}
        />
        {/* Route for 'Customers' page */}
        <Route path='customers' element={<Customers />} />
        {/* Route for individual 'Customer' details */}
        <Route path='customers/:customerId' element={<Customer />} />
        {/* Route for 'Contacts' page */}
        <Route path='contacts' element={<Contacts />} />
      </Route>
      {/* Route for handling any other paths not matched */}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

// Creating a BrowserRouter instance with the specified routes
const router = createBrowserRouter([
  { path: '*', Component: Root }
])

// App component using RouterProvider to provide the router instance
const App = () => (
  <RouterProvider router={router} />
)

// Exporting the App component as the default export
export default App;
