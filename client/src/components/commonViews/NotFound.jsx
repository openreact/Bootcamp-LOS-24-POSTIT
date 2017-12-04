import React from 'react'; // eslint-disable-line no-unused-vars
// import 404 from '../../../images/404.png';
import MainHeader // eslint-disable-line no-unused-vars
from '../layout/home/MainHeader.jsx';
import Footer from './Footer.jsx'; // eslint-disable-line no-unused-vars

/**
 * NotFound Component
 *
 * Displays a not found page when a user hits
 * a wrong url
 *
 * @method NotFound
 * @returns {Object} JSX
 */
const NotFound = () =>
  <div>
    <MainHeader />
    <div className="center landing">
      <h1>404</h1>
      <h2>Not Found</h2>
    </div>
    <Footer />
  </div>;


export default NotFound;
