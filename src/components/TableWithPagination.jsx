import React, { useEffect, useState } from 'react';
import IconPencilSquare from "../components/IconPencilSquare";
import IconBxsTrashAlt from "../components/IconBxsTrashAlt";
import { Soil } from "../components/IconFarm";
import axios from 'axios';

const TableWithPagination = ({ data }) => {

    useEffect(() => {
        setTableData(data.data)
    }, [data])

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman saat ini
    const [itemsPerPage] = useState(5); // Jumlah item per halaman
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [tableData, setTableData] = useState([])
    const [editData, setEditData] = useState({
        id: '',
        user_id: '',
        started_at: '',
        name: '',
        succes: '',
        fail: '',
    });
    const [deleteData, setDeleteData] = useState({
        id: '',
        user_id: '',
    });

    // Fungsi untuk membuka modal
    const openModal = (data) => {
        setEditData(data);
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Fungsi untuk membuka modal
    const openModalDelete = (data) => {
        setDeleteData(data);
        setIsModalDeleteOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModalDelete = () => {
        setIsModalDeleteOpen(false);
    };

    async function updateLog(data) {
        const res = await axios.put(BACKEND_URL + "/log/update/" + data.id, {
            user_id: data.user_id,
            succes: data.succes,
            fail: data.fail
        });
        closeModal();
        setTableData(res.data.data)
    }

    async function deleteLog(data) {
        const res = await axios.delete(BACKEND_URL + "/log/user/" + data.user_id + "/delete/" + data.id);
        closeModalDelete();
        setTableData(res.data.data)
    }

    useEffect(() => {
        setTableData(data.data)
    }, [])

    // console.log(data.data)

    // Data tabel
    // const tableData = data.data;

    // Menghitung index data yang ditampilkan pada halaman saat ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

    // Menghitung jumlah total halaman
    const totalPages = Math.ceil(tableData.length / itemsPerPage);

    // Fungsi untuk mengubah halaman
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                            <th className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mulai</th>
                            <th className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tumbuhan</th>
                            <th className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Berhasil</th>
                            <th className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Gagal</th>
                            <th className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((row, index) => (
                            <tr key={row.id}>
                                {/* Menampilkan nomor urut yang dilanjutkan dari halaman sebelumnya */}
                                <td className="text-center py-4 whitespace-nowrap text-sm text-gray-900">{index + indexOfFirstItem + 1}</td>
                                <td className="text-center py-4 whitespace-nowrap text-sm text-gray-900">{new Date(new Date(row.started_at)).toISOString().split("T")[0]}</td>
                                <td className="text-center py-4 whitespace-nowrap text-sm text-gray-900">{row.name}</td>
                                <td className="text-center py-4 whitespace-nowrap text-sm text-gray-900">{row.succes}</td>
                                <td className="text-center py-4 whitespace-nowrap text-sm text-gray-900">{row.fail}</td>
                                <td className="whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex gap-3 justify-center">
                                        <button onClick={() => openModal(row)} className="bg-yellow-400 p-2 rounded-xl">
                                            <IconPencilSquare />
                                        </button>
                                        <button onClick={() => openModalDelete(row)} className="bg-red-400 p-2 rounded-xl">
                                            <IconBxsTrashAlt />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 space-x-2">
                    {/* Left: Page number */}
                    <div className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </div>

                    {/* Right: Pagination buttons */}
                    <div className="flex items-center space-x-2">
                        {/* Tombol Previous */}
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-full hover:bg-gray-400 disabled:bg-gray-200"
                        >
                            &lt;
                        </button>

                        {/* Tombol Next */}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-full hover:bg-gray-400 disabled:bg-gray-200"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal delete */}
            {
                isModalDeleteOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="relative bg-white rounded-[20px] shadow-lg px-9 py-12 w-5/12">
                            <div className="flex items-center justify-center mb-8 gap-2">
                                <h1 className="opacity-70 text-xl self-center font-HelveticaNeueRoman">Anda yakin ingin menghapus riwayat ini?</h1>
                            </div>
                            <div className="flex justify-center gap-2">
                                <button onClick={() => deleteLog(deleteData)} className="bg-[#5C8D89] hover:bg-white hover:text-[#5C8D89] hover:ease-in-out duration-300 flex gap-3 font-HelveticaNeueRoman tracking-wider text-[1.125rem] py-[0.85rem] px-[2.2rem] rounded-[18px] text-white shadow-md">Iyaaa</button>
                                <button onClick={closeModalDelete} className="bg-[#fb1313ae] hover:bg-white hover:text-[#5C8D89] hover:ease-in-out duration-300 flex gap-3 font-HelveticaNeueRoman tracking-wider text-[1.125rem] py-[0.85rem] px-[2.2rem] rounded-[18px] text-white shadow-md">Batal</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Modal */}
            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="relative bg-white rounded-[20px] shadow-lg px-9 py-12 w-5/12">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 w-10 h-10 flex justify-center items-center rounded-full ]"
                            >
                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </button>
                            <div className="flex items-center justify-start mb-4 gap-2 -mt-3.5">
                                <div className="bg-[#74B49B] p-2 rounded-full">
                                    <Soil />
                                </div>
                                <h1 className="opacity-70 text-xl self-center font-HelveticaNeueRoman">Hasil penanaman</h1>
                            </div>
                            <div className="mb-4">
                                <label className="block text-[#17181D] opacity-70 mb-22">
                                    Dari Penanaman
                                    <span className="text-red-500">*</span>
                                </label>
                                <select disabled className="p-2 appearance-none block w-full h-14 mt-1 placeholder:text-[#17181D] opacity-70 border-2 focus:border-2 border-[#83898C] focus:border-[#00A0FF] rounded-[8px] px-4 shadow-sm bg-white">
                                    <option
                                        value={editData.id}
                                        className="hover:bg-[#74B49B] text-[#17181D] opacity-70 h-12">{'[ ' + new Date(new Date(editData.started_at)).toISOString().split("T")[0] + ' ] ' + editData.name}</option>
                                </select>
                            </div>
                            <div className="mb-4 flex gap-2 justify-between">
                                <div className="w-1/2">
                                    <label className="block text-[#17181D] opacity-70">
                                        Jumlah tanaman berhasil
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="p-2 px-4 appearance-none block w-full h-14 border-2 border-[#83898C] focus:border-2 focus:border-[#00A0FF]  rounded-[8px] shadow-sm"
                                        value={editData.succes}
                                        onChange={(e) => setEditData({ ...editData, succes: e.target.value })}
                                        type="number"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-[#17181D] opacity-70">
                                        Jumlah tanaman gagal
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="p-2 px-4 appearance-none block w-full h-14 border-2 border-[#83898C] focus:border-2 focus:border-[#00A0FF]  rounded-[8px] shadow-sm"
                                        value={editData.fail}
                                        onChange={(e) => setEditData({ ...editData, fail: e.target.value })}
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center pt-5">
                                <button
                                    onClick={() => updateLog(editData)}
                                    className="bg-[#5C8D89] hover:bg-white hover:text-[#5C8D89] hover:ease-in-out duration-300 flex gap-3 font-HelveticaNeueRoman tracking-wider text-[1.125rem] py-[0.85rem] px-[2.2rem] rounded-[18px] text-white shadow-md"
                                    type="submit"
                                >
                                    Simpan Data
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default TableWithPagination;
