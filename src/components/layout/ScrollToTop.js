import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { scrollToTarget } from '../../helperFunctions'

class ScrollToTop extends Component {
    state =
        {
            isVisibleScrollButton: false
        }
    componentDidMount() {
        window.scrollTo(0, 0);
        window.addEventListener('scroll', this.handleScroll);
        this.showScrollButton()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
            scrollToTarget('list-top')
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    showScrollButton = () => {
        window.scrollY > 600 ? this.setState({ isVisibleScrollButton: true }) : this.setState({ isVisibleScrollButton: false });
    }

    handleScroll = () => {
        this.showScrollButton()
    }

    render() {
        return (
            <Fragment>
                {this.props.children}
                {this.state.isVisibleScrollButton && <i onClick={() => scrollToTarget('root')} className="scrollTopButton fas fa-chevron-circle-up"></i>}
            </Fragment>
        );
    }
}

export default withRouter(ScrollToTop)