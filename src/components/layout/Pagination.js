import React from 'react';
import { Link } from 'react-router-dom';
import { generateUUID } from '../../helperFunctions';

const Pagination = props => {
    const pagination = (c, m) => {
        let current = c,
            last = m,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        for (let i = 1; i <= last; i++) {
            if (i == 1 || i == last || i >= left && i < right) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;

    }

    const createPaginationPath = pageNumber => {
        const params = new URLSearchParams(window.location.search)

        params.set('page', pageNumber)
        const newPath = `${window.location.pathname}?${params}`;

        return newPath
    }

    const renderPagination = () => {
        return pagination(props.currentPage, props.totalPages).map((page, index) => {
            return page !== '...' ? <Link key={generateUUID()} to={createPaginationPath(page)}> <span className={props.currentPage === page ? 'active' : ''} >{page}</span> </Link> : <span key={generateUUID()} className="dots" >{page}</span>
        })
    }
    const renderPrevButton = () => {
        return props.currentPage > 1 ? <Link to={createPaginationPath(props.currentPage - 1)}><span><i className="fas fa-chevron-left"></i>  prev </span></Link> : <span><i className="fas fa-chevron-left"></i>  prev </span>
    }
    const renderNextButton = () => {
        return props.currentPage < props.totalPages ? <Link to={createPaginationPath(props.currentPage + 1)}><span> next <i className="fas fa-chevron-right"></i>  </span></Link> : <span> next <i className="fas fa-chevron-right"></i></span>
    }
    return props.totalPages > 1 ? (
        <div className="pagination">
            {renderPrevButton()}
            {renderPagination()}
            {renderNextButton()}
        </div>
    ) : null

}

export default Pagination;