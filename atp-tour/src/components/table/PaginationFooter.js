import './PaginationFooter.css';

const PaginationFooter = ({ data, action }) => {
    const pages = [];
    const { number, totalPages, sort } = data;
    var {size} = data;

    const paginationNumbers = () => {
        var startPage;
        if (totalPages - number >= 5) {
            startPage = number === 0 ? 0 : number === 1 ? number - 1 : number - 2;
        }
        else {
            startPage = number - 6 + (totalPages - number);
            startPage = startPage < 0 ? 0 : startPage;
        }

        const numberOfPages = totalPages > 7 ? 7 : totalPages;

        for (var i = startPage; i < numberOfPages + startPage; i++) {
            let pageNumber = i;
            const elementClass = i === number ? 'pagination-element selected' : 'pagination-element';
            pages.push(<button key={i} onClick={() => changePage((pageNumber))} className={elementClass}>{i + 1}</button>)
        }
        return pages;
    }

    const changePage = (page) => {
        const pagingValues = { page, size, sort };
        action(pagingValues);
    }

    return (

        <div>

            <button className="pagination-element" onClick={() => changePage(number - 1)} disabled={number - 1 < 0}>
                {"<"} Previous
            </button>{" "}
            {paginationNumbers()} {" "}
            <button className="pagination-element" onClick={() => changePage(number + 1)} disabled={number >= totalPages - 1}>
                Next {">"}
            </button>{" "}
            <select
                value={size}
                onChange={(e) => { size = e.target.value; changePage(0); }}
            >
                {[10, 25, 50].map((size) => (
                    <option key={size} value={size}>
                        Show {size}
                    </option>
                ))}
            </select>
        </div>
    );
}




export default PaginationFooter;