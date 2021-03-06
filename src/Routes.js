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
  Calendar as CalendarView,
  Interviewer as InterviewerView,
  BookInterview as BookInterviewView,
  Applicants as ApplicantsView,
  Account as AccountView,
  Comments as CommentsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Logout as LogoutView
} from './views';

const token = reactLocalStorage.get('token', '');
const userProfile = reactLocalStorage.getObject('Profile', {'role': 'sss'} );
const Auth = {
  isAuthenticated: token,
  userRole: userProfile.RoleName
}

const PrivateRoute = ({...rest}) => (
  Auth.isAuthenticated && Auth.userRole == 'Administrator' ? 
  <Route
    {...rest}
  />
  :
  <Redirect to="/sign-in" />
);
const InterviewerRoute = ({...rest}) => (
  Auth.isAuthenticated && Auth.userRole == 'Interviewer' ? 
  <Route
    {...rest}
  />
  :
  <Redirect to="/sign-in" />
);
const ApplicantRoute = ({...rest}) => (
  Auth.isAuthenticated && Auth.userRole == 'Applicant' ? 
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
          layout={AdminMainLayout}
          path="/admin"
          render={({ match: { url } }) => (
            <>
              <RouteWithLayout
                component={DashboardView}
                exact
                layout={AdminMainLayout}
                path={`${url}/`}
              />
              <RouteWithLayout
                component={InterviewerView}
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
                component={CommentsView}
                exact
                layout={AdminMainLayout}
                path={`${url}/comment`}
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
          layout={InterviewerMainLayout}
          path="/interviewer"
          render={({ match: { url } }) => (
            <>
              <RouteWithLayout
                component={DashboardView}
                exact
                layout={InterviewerMainLayout}
                path={`${url}/`}
              />
              <RouteWithLayout
                component={CalendarView}
                exact
                layout={InterviewerMainLayout}
                path={`${url}/calendar`}
              />
              <RouteWithLayout
                component={CommentsView}
                exact
                layout={InterviewerMainLayout}
                path={`${url}/comment`}
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
          layout={ApplicantMainLayout}
          path="/applicant"
          render={({ match: { url } }) => (
            <>
              <RouteWithLayout
                component={BookInterviewView}
                exact
                layout={ApplicantMainLayout}
                path={`${url}/`}
              />
              {/* <RouteWithLayout
                component={TypographyView}
                exact
                layout={ApplicantMainLayout}
                path={`${url}/interviewer`}
              /> */}
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

        <Route
          component={LogoutView}
          exact
          path="/logout"
        />

        <Redirect to="/not-found" />


      </Switch>

    </BrowserRouter>
  )

};

export default Routes;
