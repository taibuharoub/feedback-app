import PropTypes from 'prop-types';

const Header = ({text}) =>  {
    return (
        <header>
            <div className="container">
                <h2>{text}</h2>
            </div>
        </header>
    )
}

//set default props if not passed in
Header.defaultProps = {
    text: 'Feedback UI'
}

Header.propTypes = {
    text: PropTypes.string,
}

export default Header
