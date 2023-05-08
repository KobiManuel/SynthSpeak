import React from 'react';
import PropTypes from 'prop-types';
const Loader = ({   onClick, size = 20 }) => {
return(
<svg
style={{width: size, height: size}}
onClick={onClick}
xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"  width="104px" height="104px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#9747ff" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
<animateTransform attributeName="transform" type="rotate" dur="0.839344262295082s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
</circle>
<circle cx="50" cy="50" r="23" strokeWidth="8" stroke="#000000" strokeDasharray="36.12831551628262 36.12831551628262" strokeDashoffset="36.12831551628262" fill="none" strokeLinecap="round">
<animateTransform attributeName="transform" type="rotate" dur="0.839344262295082s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
</circle>
</svg>
)};
Loader.propTypes = {
onClick: PropTypes.func,
size: PropTypes.number
};export default Loader;