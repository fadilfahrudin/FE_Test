import { EyeIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import { useGetGerbangByIdQuery, useGetGerbangsByKeywordsQuery, useGetGerbangsQuery } from '../redux/services/gerbangService';
import { useAppDispatch } from '../utils/reduxHooks';
import { addGerbang, deleteGerbang, editGerbang } from '../redux/slice/gerbangSlice';
import useRandomId from '../utils/randomIdHooks';

type ActionType = "edit" | "detail" | "tambah" | "delete";

interface PopUpRuasActionProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    actionType: ActionType;
    id?: number;
    idCabang?: number;
}

const PopUpRuasAction: React.FC<PopUpRuasActionProps> = ({ setOpen, actionType, id, idCabang }) => {
    const dispatch = useAppDispatch()
    const { data, isSuccess } = useGetGerbangByIdQuery({ id: id, IdCabang: idCabang })
    const [cabang, setCabang] = useState("")
    const [gerbang, setGerbang] = useState("")
    const randomId = useRandomId(6)

    useEffect(() => {
        if (isSuccess && id) {
            setCabang(data?.data.rows.rows[0].NamaCabang)
            setGerbang(data.data.rows.rows[0].NamaGerbang)
        }
    }, [isSuccess, data, id])

    // const isFormValid = cabang.trim() !== "" && gerbang.trim() !== "";
    const rendertitle = () => {
        switch (actionType) {
            case "edit":
                return "Edit Gerbang"
            case "detail":
                return "Detail Gerbang"
            default:
                return "Tambah Gerbang"
        }
    }

    const deleteHandler = () => {
        if (id && idCabang) {
            dispatch(deleteGerbang({ id, idCabang }))
            setOpen(false)
        }
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (actionType === "tambah") {
            dispatch(addGerbang({ id: randomId, IdCabang: randomId, NamaGerbang: gerbang, NamaCabang: cabang, }));
            return
        }
        if (actionType === "edit") {
            dispatch(editGerbang({ id: Number(id), IdCabang: Number(idCabang), NamaGerbang: gerbang, NamaCabang: cabang, }));
            return
        }
    };

    if (actionType === "delete") {
        return (
            <section className='absolute top-0 left-0 z-20 w-full h-screen flex items-center justify-center'>
                <div className="flex gap-6 items-center w-1/3 py-14 px-5 rounded-md shadow-lg flex-col bg-light">
                    <h3 className='text-2xl text-dark'>Yakin ingin menghapus data ini ?</h3>
                    <div className='flex gap-2 w-3/4'>
                        <button type='button' onClick={() => setOpen(false)} className='disabled:opacity-50 transition-all ease-in-out disabled:cursor-not-allowed w-full px-4 py-3 bg-red-400 rounded-md font-semibold text-dark shadow-md'>Batal</button>
                        <button type='submit' onClick={deleteHandler} className='disabled:opacity-50 transition-all ease-in-out disabled:cursor-not-allowed w-full px-4 py-3 bg-yellow rounded-md font-semibold text-dark shadow-md'>Simpan</button>
                    </div>
                </div>
            </section>
        )
    }




    return (
        <section className='absolute top-0 left-0 z-20 w-full h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className="flex gap-6 items-center w-1/3 py-14 px-5 rounded-md shadow-lg flex-col bg-light">
                <h3 className='text-2xl text-dark'>{rendertitle()}</h3>

                <label htmlFor="ruas" className='w-3/4'>
                    <span className='sr-only'>Cabang</span>
                    <input
                        readOnly={actionType === "detail"}
                        type="text"
                        name="NamaCabang"
                        placeholder="Nama Cabang"
                        value={cabang}
                        onChange={(e) => setCabang(e.target.value)}
                        required
                        className='outline-none focus:outline-none focus:shadow-sm transition-all ease-in-out w-full px-4 py-3 rounded-md text-dark shadow-md'
                    />
                </label>
                <label htmlFor="gerbang" className='w-3/4'>
                    <span className='sr-only'>Gerbang</span>
                    <input
                        readOnly={actionType === "detail"}
                        type="text"
                        name="NamaGerbang"
                        placeholder="Nama Gerbang"
                        value={gerbang}
                        onChange={(e) => setGerbang(e.target.value)}
                        required
                        className='outline-none focus:outline-none focus:shadow-sm transition-all ease-in-out w-full px-4 py-3 rounded-md text-dark shadow-md'
                    />
                </label>
                <div className='flex gap-2 w-3/4'>
                    {
                        actionType === "detail" ?
                            <button type='button' onClick={() => setOpen(false)} className='disabled:opacity-50 transition-all ease-in-out disabled:cursor-not-allowed w-full px-4 py-3 bg-blue rounded-md font-semibold text-light shadow-md'>Tutup</button>
                            :
                            <>
                                <button type='button' onClick={() => setOpen(false)} className='disabled:opacity-50 transition-all ease-in-out disabled:cursor-not-allowed w-full px-4 py-3 bg-red-400 rounded-md font-semibold text-dark shadow-md'>Batal</button>
                                <button type='submit' className='disabled:opacity-50 transition-all ease-in-out disabled:cursor-not-allowed w-full px-4 py-3 bg-yellow rounded-md font-semibold text-dark shadow-md'>Simpan</button>
                            </>
                    }
                </div>
            </form>
        </section>
    )
}

const MasterDataGerbang: React.FC = () => {
    const [isPopUpRuas, setIsPopUpRuas] = useState(false);
    const [keywords, setKeywords] = useState('');
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [popUpAction, setPopUpAction] = useState<ActionType>("tambah");
    const [id, setId] = useState(0);
    const [idCabang, setIdCabang] = useState(0);
    const [dataGerbang, setDataGerbang] = useState([])
    const { data, isSuccess } = useGetGerbangsQuery({ limit, page })
    const { data: dataQuery, isSuccess: isSuccessQuery } = useGetGerbangsByKeywordsQuery({ limit, page, keywords: keywords })

    const queryHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSuccessQuery) {
            setDataGerbang(dataQuery.data.rows.rows)
        }
    }
    const onPageChange = (selected: number) => {
        setPage(selected)
    }
    const handlePopUpAction = (actionType: ActionType, gerbangId?: number, idCAbang?: number) => {
        setPopUpAction(actionType)
        setIsPopUpRuas(true)
        if (gerbangId && idCAbang) {
            setId(gerbangId)
            setIdCabang(idCAbang)
        }
    }

    const onLimitChange = (e) => {
        setLimit(Number(e.target.value))
        setPage(1)
    }

    useEffect(() => {
        if (isSuccess) {
            setPage(data.data.current_page)
            setPages(data.data.total_pages)
            setDataGerbang(data.data.rows.rows)
        }
    }, [isSuccess, data])
    return (
        <main className='h-full w-full float-right px-5 pb-12 '>

            {
                isPopUpRuas &&
                <>
                    <PopUpRuasAction setOpen={setIsPopUpRuas} actionType={popUpAction} id={id} idCabang={idCabang} />
                    <span className='w-full h-full absolute top-0 left-0 z-10 bg-opacity-50 bg-darkBlue backdrop-blur-md'></span>
                </>
            }

            <h1 className='text-2xl text-dark'>Master Data Gerbang</h1>

            <button onClick={() => handlePopUpAction('tambah')} className="flex gap-2 items-center rounded-md float-right ms-3 py-2 px-4 bg-yellow shadow-md">Add <PlusCircleIcon className="w-5 h-5" /></button>
            <form className="float-right w-5/12 mb-3" onSubmit={queryHandler}>
                <div className="flex justify-between">
                    <input type="text" className="outline-none focus:outline-none focus:shadow-sm transition-all ease-in-out p-2 bg-Light shadow-md rounded-s-md w-full" placeholder="Masukan nama gerbang..." aria-label="search data" aria-describedby="search-data" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                    <button className="w-4/12 bg-yellow rounded-e-md shadow-md" type="submit" id="search-data">Search</button>
                </div>
            </form>
            <table className="table-fixed w-full rounded-t-lg overflow-hidden">
                <thead className='bg-yellow  border-4 border-yellow'>
                    <tr>
                        <th colSpan={1} className=" text-darkBlue py-3 px-6 text-left">NO</th>
                        <th colSpan={1} className=" text-darkBlue py-3 px-6 text-left">Cabang</th>
                        <th colSpan={1} className=" text-darkBlue py-3 px-6 text-left">Gerbang</th>
                        <th colSpan={1} className=" text-darkBlue py-3 px-6 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className='bg-Light shadow-lg  border-4 border-yellow '>
                    {
                        isSuccess && dataGerbang.map((gerbang, i) => (
                            <tr key={gerbang.id} className={`${i % 2 === 0 ? 'bg-Light' : 'bg-slate-100'} text-darkBlue font-semibold text-sm`}>
                                <td colSpan={1} className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                                <td colSpan={1} className="px-6 py-4 whitespace-nowrap">{gerbang.NamaCabang}</td>
                                <td colSpan={1} className="px-6 py-4 whitespace-nowrap">{gerbang.NamaGerbang}</td>
                                <td colSpan={1} className="px-6 py-4 whitespace-nowrap flex gap-4">
                                    <button type='button' onClick={() => handlePopUpAction('edit', gerbang.id, gerbang.IdCabang)}><span className='sr-only'>edit</span> <PencilSquareIcon className="w-5 h-5" /></button>
                                    <button type='button' onClick={() => handlePopUpAction('detail', gerbang.id, gerbang.IdCabang)}><span className='sr-only'>see detail</span> <EyeIcon className="w-5 h-5" /></button>
                                    <button type='button' onClick={() => handlePopUpAction('delete', gerbang.id, gerbang.IdCabang)}><span className='sr-only'>delete</span> <TrashIcon className="w-5 h-5" /></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="flex items-center justify-between bg-yellow px-4 py-1 sm:px-6">
                <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div className='flex gap-2'>
                        <p className="text-sm text-darkBlue">
                            Showing
                        </p>
                        <select name="limit" id="limit" value={limit} onChange={onLimitChange} className='font-semibold'>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <p className="text-sm text-darkBlue">
                            entries
                        </p>
                    </div>
                    <div>
                        <Pagination
                            onPageChange={onPageChange}
                            page={page}
                            pages={pages}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MasterDataGerbang