import { BrowserRouter as RouterApp, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Register } from '../../resources/pages/Register/Register.page';
import { useContext, useEffect } from 'react';
import { IStateDataProvider } from '../context/DataProvider/Data.provider.types';
import { Auth, Management, User, History } from '../../resources/pages/';
import { ContextState } from 'app/context';

export function RouterBrowser() {
  const {userApi} = useContext(ContextState) as IStateDataProvider;

  useEffect(() => {
    //console.log(userApi.userData);
  }, [userApi]);

  return (
    <>
      <RouterApp>
        <Switch>
          <Route
            exact
            path='/'
            component={Auth}
          />
          <Route
            exact
            path='/register'
            component={Register}
          />
          <PrivateRoute path='/home'>
            <Management />
          </PrivateRoute>
          <PrivateRoute path='/user'>
            <User />
          </PrivateRoute>
          <PrivateRoute path='/history'>
            <History />
          </PrivateRoute>
        </Switch>
      </RouterApp>
    </>
  );
}
