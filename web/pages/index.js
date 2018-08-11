// @flow
import * as React from 'react';
import withData from '../libraries/withData';
import LayoutCon from '../containers/Layout';

export default withData(props => (
  <LayoutCon {...props}>
    <div> Hola </div>
  </LayoutCon>
));
