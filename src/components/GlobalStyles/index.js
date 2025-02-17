import React from 'react';
import PropTypes from 'prop-types'
import '~/components/GlobalStyles/GlobalStyles.scss'
function GlobalStyles({ children }) {
    return React.Children.only(children);
}
GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};
export default GlobalStyles;
