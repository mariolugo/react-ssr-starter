// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

type Props = {
  children: React.Node
};

const App = ({ children }: Props) => <div>{children}</div>;

App.propTypes = {
  children: PropTypes.array.isRequired
};

export default App;
