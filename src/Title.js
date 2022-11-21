import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Title = props => {

    useEffect(() => {
        if (props.title === 'undefined') {
            document.title = 'TMovies';
        } else {
            document.title = props.title;
        }
    },[props.title])

    return (
        <div>{props.children}</div>
    );
};

Title.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Title;