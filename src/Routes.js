/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Switch, Redirect, Route, BrowserRouter } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import { RouteWithLayout } from './components';
import { Main as AdminMainLayout, Minimal as MinimalLayout } from './layouts/Admin';
import { Main as InterviewerMainLayout} from './layouts/Interviewer';
import { Main as ApplicantMainLayout} from './layouts/Applicant';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Applicants as ApplicantsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';

const token = reactLocalStorage.get('token', '');
const userProfile = reactLocalStorage.getObject('Profile', {'role': 'sss'} );
const Auth = {
  isAuthenticated: token,
  userRole: userProfile.RoleName
}

const PrivateRoute = ({...rest}) => (
  Auth.isAuthenticated && Auth.userRole == 'administrator' ? 
  <Route
    {...rest}
  />
  :
  <Redirect to="/sign-in" />
);
const InterviewerRoute = ({...rest}) => (
  Auth.isAuthenticated && Auth.userRole == 'interviewer' ? 
  <Route
    {...rest}
  />
  :
  <Redirect to="/sign-in" />
);
const ApplicantRoute = ({...rest}) => (
  Auth.isAuthenticated && Auth.userRole == 'applicant' ? 
  <Route
    {...rest}
  />
  :
  <Redirect to="/sign-in" />
);


// eslint-disable-next-line react/no-multi-comp
const Routes = () => {

  return (
    <BrowserRouter>

      <Switch>

        
        <Redirect
          exact
          from="/"
          to="/sign-in"
        />
        <PrivateRoute
          path="/admin"
          layout={AdminMainLayout}
          render={({ match: { url } }) => (
            <>
              <RouteWithLayout
                component={DashboardView}
                exact
                layout={AdminMainLayout}
                path={`${url}/`}
              />
              <RouteWithLayout
                component={UserListView}
                exact
                layout={AdminMainLayout}
                path={`${url}/interviewers`}
              />
              <RouteWithLayout
                component={ApplicantsView}
                exact
                layout={AdminMainLayout}
                path={`${url}/applicants`}
              />
              <RouteWithLayout
                component={AccountView}
                exact
                layout={AdminMainLayout}
                path={`${url}/account`}
              />
            </>
          )}
        />
        <InterviewerRoute
          path="/interviewer"
          layout={InterviewerMainLayout}
          render={({ match: { url } }) => (
            <>
              <RouteWithLayout
                component={DashboardView}
                exact
                layout={InterviewerMainLayout}
                path={`${url}/`}
              />
              <RouteWithLayout
                component={ProductListView}
                exact
                layout={InterviewerMainLayout}
                path={`${url}/calendar`}
              />
              <RouteWithLayout
                component={AccountView}
                exact
                layout={InterviewerMainLayout}
                path={`${url}/account`}
              />
            </>
          )}
        />
        <ApplicantRoute
          path="/applicant"
          layout={ApplicantMainLayout}
          render={({ match: { url } }) => (
            <>
              <RouteWithLayout
                component={DashboardView}
                exact
                layout={ApplicantMainLayout}
                path={`${url}/`}
              />
              <RouteWithLayout
                component={TypographyView}
                exact
                layout={ApplicantMainLayout}
                path={`${url}/interviewer`}
              />
              <RouteWithLayout
                component={AccountView}
                exact
                layout={ApplicantMainLayout}
                path={`${url}/account`}
              />
            </>
          )}
        />


        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path="/sign-up"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/sign-in"
        />

        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        <Redirect to="/not-found" />


      </Switch>

    </BrowserRouter>
  )

};

export default Routes;
