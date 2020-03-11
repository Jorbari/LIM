/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Switch, Redirect, Route, BrowserRouter } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

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
const userProfile = reactLocalStorage.getObject('userProfile', {'role': 'sss'} );
const Auth = {
  isAuthenticated: token,
  userRole: userProfile.role.name
}

// const PrivateRoute = ({component: Component, ...rest}) => (
//   <Route
//     {...rest}
//     render={(props) => (
//     Auth.isAuthenticated === true ? 
//     <Component {...props} /> : <Redirect to="/sign-in" />
//   )}
//   />
// );
const PrivateRoute = ({...rest}) => (
  Auth?.isAuthenticated != '' && Auth.userRole == 'administrator' ? 
  <Route
    {...rest}
  />
  :
  <Redirect to="/sign-in" />
);
const InterviewerRoute = ({...rest}) => (
  Auth?.isAuthenticated != '' && Auth.userRole == 'interviewer' ? 
  <Route
    {...rest}
  />
  :
  <Redirect to="/sign-in" />
);
const ApplicantRoute = ({...rest}) => (
  Auth?.isAuthenticated != '' && Auth?.userRole == 'applicant' ? 
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
        {/* <Route path="/interviewer" component={HomePage} />
        <Route path="/applicant" component={AboutPage} /> */}

        {/* <PrivateRoute></PrivateRoute> */}
        <PrivateRoute
          path="/admin"
          layout={MainLayout}
          render={({ match: { url } }) => (
            <>
              <RouteWithLayout
                component={DashboardView}
                exact
                layout={MainLayout}
                path={`${url}/`}
              />
              <RouteWithLayout
                component={UserListView}
                exact
                layout={MainLayout}
                path={`${url}/interviewers`}
              />
              <RouteWithLayout
                component={ApplicantsView}
                exact
                layout={MainLayout}
                path={`${url}/applicants`}
              />
            </>
          )}
        />
        <InterviewerRoute
          path="/interviewer"
          layout={MainLayout}
          render={({ match: { url } }) => (
            <>
              <RouteWithLayout
                component={DashboardView}
                exact
                layout={MainLayout}
                path={`${url}/`}
              />
              <RouteWithLayout
                component={UserListView}
                exact
                layout={MainLayout}
                path={`${url}/interviewers`}
              />
              <RouteWithLayout
                component={ApplicantsView}
                exact
                layout={MainLayout}
                path={`${url}/applicants`}
              />
            </>
          )}
        />
        <ApplicantRoute
          path="/applicant"
          layout={MainLayout}
          render={({ match: { url } }) => (
            <>
              <RouteWithLayout
                component={DashboardView}
                exact
                layout={MainLayout}
                path={`${url}/`}
              />
              <RouteWithLayout
                component={UserListView}
                exact
                layout={MainLayout}
                path={`${url}/interviewers`}
              />
              <RouteWithLayout
                component={ApplicantsView}
                exact
                layout={MainLayout}
                path={`${url}/applicants`}
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

  // return (
  //   <Switch>
  //     <Redirect
  //       exact
  //       from="/"
  //       to="/sign-in"
  //     />
  //     <RouteWithLayout
  //       component={DashboardView}
  //       exact
  //       layout={MainLayout}
  //       path="/dashboard"
  //     />
  //     <RouteWithLayout
  //       component={UserListView}
  //       exact
  //       layout={MainLayout}
  //       path="/interviewers"
  //     />
  //     <RouteWithLayout
  //       component={ProductListView}
  //       exact
  //       layout={MainLayout}
  //       path="/calendar"
  //     />
  //     <RouteWithLayout
  //       component={TypographyView}
  //       exact
  //       layout={MainLayout}
  //       path="/typography"
  //     />
  //     <RouteWithLayout
  //       component={ApplicantsView}
  //       exact
  //       layout={MainLayout}
  //       path="/applicants"
  //     />
  //     <RouteWithLayout
  //       component={AccountView}
  //       exact
  //       layout={MainLayout}
  //       path="/account"
  //     />
  //     <RouteWithLayout
  //       component={SettingsView}
  //       exact
  //       layout={MainLayout}
  //       path="/settings"
  //     />
  //     <RouteWithLayout
  //       component={SignUpView}
  //       exact
  //       layout={MinimalLayout}
  //       path="/sign-up"
  //     />
  //     <RouteWithLayout
  //       component={SignInView}
  //       exact
  //       layout={MinimalLayout}
  //       path="/sign-in"
  //     />
  //     <RouteWithLayout
  //       component={NotFoundView}
  //       exact
  //       layout={MinimalLayout}
  //       path="/not-found"
  //     />
  //     <Redirect to="/not-found" />
  //   </Switch>
  // );

};

export default Routes;
