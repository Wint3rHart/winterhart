import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Movies from './Movies';
import useSignStore from './useSignStore';

// Lazy-loaded components
const Login = lazy(() => import('./Sign'));
const Details = lazy(() => import('./Details'));
const Seats = lazy(() => import('./Seats'));
const User = lazy(() => import('./User'));

function MainRoutes() {
  let status = useSignStore(state => state.fields.status);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Movies route as parent wrapping child routes */}
        <Route
          path='/movies'
          element={
            <Suspense fallback="...LOADING">
              <Movies />
            </Suspense>
          }
        >
          <Route
            path='details'
            element={
              <Suspense fallback="...LOADING">
                <Details />
              </Suspense>
            }
          />
        </Route>

        <Route
          path='/movies/seats/:id'
          element={
            <Suspense fallback="...LOADING">
              <Seats />
            </Suspense>
          }
        />

        <Route
          path='/register'
          element={
            <Suspense fallback="...LOADING">
              <Login />
            </Suspense>
          }
        />

        <Route
          path='/user/:user_id'
          element={
            <Suspense fallback="...LOADING">
              {status ? <User /> : <h1>NO USER SIGNED IN</h1>}
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default MainRoutes;
