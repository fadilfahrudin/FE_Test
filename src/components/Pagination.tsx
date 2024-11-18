import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"

interface Props {
    pages: number,
    page: number,
    onPageChange: (page: number) => void
}

const Pagination = ({ pages, page, onPageChange }: Props) => {

    const pageContent: JSX.Element[] = []
    for (let i = 1; i <= pages; i++) {
        pageContent.push(<button type="button" key={i} className={`${ page == i ? ' text-gray-600' : 'text-slate-50 bg-transparent' } first-letter:relative inline-flex items-center px-4 py-2 text-sm font-semibold hover:bg-gray-50 hover:text-gray-600 focus:z-20 focus:outline-offset-0`} onClick={() => onPageChange(i)}>{i}</button>)
    }
    return (
        <nav className="isolate inline-flex -space-x-px rounded-md ">
            <button type="button" onClick={() => onPageChange(page - 1)} {...(page === 0 ? { disabled: true } : {})} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-50  cursor-pointer hover:bg-gray-50 hover:text-gray-600 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            {pageContent}
            <button type="button" onClick={() => onPageChange(page + 1)} {...(page === 0 ? { disabled: true } : {})} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-50 cursor-pointer hover:bg-gray-50 hover:text-gray-600 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
        </nav>
    )
}

export default Pagination