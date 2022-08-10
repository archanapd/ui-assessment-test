import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export default function GuardedRoute(props: any) {
  const Component = props.component;
  const { requiredData } = props;

  console.log('inside guards', props);
  if (requiredData && Object.keys(requiredData).length === 0) {
    //return <Navigate to={{ pathname: '/preview/:questionId' }} />;
  }
  return (
    <React.Fragment>
      <Route
        {...props}
        render={(routerProps: JSX.IntrinsicAttributes) => {
          return <Component {...routerProps} />;
        }}
      />
    </React.Fragment>
  );
}
