import React, { useState } from 'react'
import Pagination from '../components/Pagination';
import { ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Lalin: React.FC = () => {
    const [keywords, setKeywords] = useState('');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const queryHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQuery(keywords)
    }
    const onPageChange = (selected: number) => {
        setPage(selected)
    }
    return (
        <main className='h-full w-full float-right px-5 pb-12 '>
            <h1 className='text-2xl text-dark'>Laporan Lalin Per Hari</h1>
            <div className='flex justify-around w-full bg-yellow m-auto my-4 p-4 rounded-lg shadow-md'>
                <form className="w-8/12 flex gap-3 " onSubmit={queryHandler}>
                    <div className="flex justify-between items-center relative">
                        <input type="text" className="border border-slate-50 outline-none focus:outline-none focus:shadow-sm transition-all ease-in-out p-2 pe-5 bg-slate-50 shadow-md rounded-md w-full" placeholder="Masukan kata kunci..." aria-label="search data" aria-describedby="search-data" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                        <button className="absolute h-full border-0 right-0 pe-3 bg-slate-50 rounded-e-md " type="submit" id="search-data"><MagnifyingGlassIcon className='w-6 h-6'/></button>
                    </div>
                    <div className="flex justify-between">
                        <input type="date" className="outline-none focus:outline-none focus:shadow-sm transition-all ease-in-out p-2 bg-slate-50 shadow-md rounded-s-md w-full" placeholder="Masukan kata kunci..." aria-label="search data" aria-describedby="search-data" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                        <button className="w-1/2 bg-light rounded-e-md shadow-md px-2 text-darkBlue" type="submit" id="search-data">Filter</button>
                    </div>
                </form>
                <div className='flex items-center relative w-3/12 bg-slate-50 overflow-hidden shadow-md rounded-md '>
                    <select name="payment" id="payment" className='p-2 bg-transparent w-full cursor-pointer appearance-none outline-none focus:outline-none focus:shadow-sm transition-all ease-in-out'>
                        <option value="bri">Tunai</option>
                        <option value="bri">DinasOpr</option>
                        <option value="bri">DinasKary</option>
                        <option value="bri">E-Mandiri</option>
                        <option value="eBri">E-Bri</option>
                        <option value="eBNI">E-BNI</option>
                        <option value="eBCA">E-BCA</option>
                        <option value="eNobu">E-Nobu</option>
                        <option value="eDki">E-DKI</option>
                        <option value="eMega">E-Mega</option>
                        <option value="eFlo">E-Flo</option>
                    </select>
                    <ChevronUpDownIcon className='pointer-events-none absolute right-2 w-6 h-6 text-dark' />
                </div>
            </div>
            <table className="table-fixed w-full rounded-t-lg overflow-hidden">
                <thead className='bg-yellow  border-4 border-yellow'>
                    <tr>
                        <th colSpan={1} className=" text-darkBlue py-3 px-6 text-left">NO</th>
                        <th colSpan={1} className=" text-darkBlue py-3 px-6 text-left">Ruas</th>
                        <th colSpan={1} className=" text-darkBlue py-3 px-6 text-left">Gerbang</th>
                    </tr>
                </thead>
                <tbody className='bg-Light shadow-lg  border-4 border-yellow '>
                    <tr className={`${2 % 2 === 0 ? 'bg-Light' : 'bg-slate-100'} text-darkBlue font-semibold text-sm`}>
                        <td colSpan={1} className="px-6 py-4 whitespace-nowrap">{1}</td>
                        <td colSpan={1} className="px-6 py-4 whitespace-nowrap">{'Ruas 1'}</td>
                        <td colSpan={1} className="px-6 py-4 whitespace-nowrap">{'Gerbang 1'}</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex items-center justify-between bg-yellow px-4 py-1 sm:px-6">
                <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-darkBlue">
                            Showing Page <span className="font-semibold">{page + 1}</span> to <span className="font-semibold">{5}</span> of{' '}
                            <span className="font-semibold">{100}</span> data
                        </p>
                    </div>
                    <div>
                        <Pagination
                            onPageChange={onPageChange}
                            page={page}
                            pages={5}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Lalin