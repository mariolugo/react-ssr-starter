// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import App from '../components/App';

type Props = {
  title?: string,
  router: Object,
  children: React.Element<*>
};

const Layout = (props: Props) => {
  <App>
    <Helmet>
      <title>
        {props.title && props.title !== ''
          ? `${props.title} :: RAN! React . GraphQL . Next.js Toolkit`
          : 'RAN! React . GraphQL . Next.js Toolkit'}
      </title>
    </Helmet>
    <div>{props.children}</div>
  </App>;
};

Layout.propTypes = {
  title: PropTypes.string,
  router: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

Layout.defaultProps = {
  title: ''
};

export default withRouter(Layout);
