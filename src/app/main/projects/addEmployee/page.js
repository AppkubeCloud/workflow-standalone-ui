"use client"
import React, { useState } from 'react'
import { Button } from 'antd'
import { Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Array from './array';
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

const page = () => {
    const [data, setData] = useState(Array);

    const handleDelete = (id) => {
        const updatedData = data.filter(employee => employee.id !== id);
        console.log(updatedData);
        setData(updatedData);
    };

    return (
        <div>
            <div className='w-full bg-white'>
                <div className='p-5'>
                    <h1 className='text-black font-semibold text-2xl'>Create Project</h1>
                    <p className='text-black font-semibold '>Form pages are used to collect or verify information to users, and basic forms are common in scenarios where there are fewer data items.</p>
                </div>
            </div>
            <div>
                <div className='rounded-md mt-5 space-y-5 p-5 bg-white'>
                    <div className='flex justify-between'>
                        <h1 className='text-xl font-bold leading-snug tracking-normal text-left'>Setup project</h1>
                        <div className='space-x-8'>
                            <Button icon={<EditOutlined />} >Edit</Button>
                            <Button type="primary" className='bg-blue-500' >create</Button>
                        </div>
                    </div>
                    <div className='flex space-x-10 w-screen items-center'>
                        <div><img src='https://cdn.pixabay.com/photo/2015/07/20/12/53/gehlert-852762_1280.jpg' className='w-[7rem] h-[7rem] rounded-md' /></div>
                        <div className='flex  '>
                            <div className='p-5 space-y-10 mx-5'>
                                <div>
                                    <p>Project Name</p>
                                    <h3 className='font-semibold'>Procurement</h3>
                                </div>
                                <div>
                                    <p>Project department</p>
                                    <h3 className='font-semibold'>Department</h3>
                                </div>

                            </div>


                            <div className='p-5 space-y-10 mx-5'>
                                <div>
                                    <p>Project Description</p>
                                    <h3 className='font-semibold'>-----</h3>
                                </div>
                                <div>
                                    <p>Project Duration</p>
                                    <h3 className='font-semibold'>04/02/2023 TO 04/02/2024</h3>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5 flex flex-col space-y-4 bg-white rounded-md p-10'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-semibold leading-normal tracking-normal text-left'>Resource Pool</h1>
                    <div>
                        <Search
                            placeholder="Search employe"
                            onSearch={onSearch}
                            style={{
                                width: '16.5rem',
                                height: '2rem'
                            }}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Designation</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Mail ID</th>
                                <th className="px-6 ml-9 py-3 text-left text-xs font-medium text-black uppercase tracking-wider" colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.length > 0 ? (data.map((filter) =>
                                <tr key={filter.id} className="bg-white">
                                    <td className=" py-2 whitespace-nowrap">
                                        <div className="flex items-center space-x-5">
                                            <img className="h-10 w-10 rounded-full" src={filter.name.image.src} alt="Profile" />
                                            <div className="text-sm font-medium text-gray-900">{filter.name.name}</div>
                                        </div>
                                    </td>
                                    <td className="py-2 text-sm text-center font-medium text-gray-900">{filter.Designation}</td>
                                    <td className="py-2 text-sm font-medium text-gray-900">{filter.MailID}</td>
                                    <td className="py-2 whitespace-nowrap text-sm space-x-5">
                                        <Button icon={<EditOutlined />} >Edit</Button>
                                        <Button type="primary" className='bg-red-500' danger icon={<DeleteOutlined />} onClick={() => handleDelete(filter.id)}>Remove</Button>

                                    </td>
                                    {/* <td className="py-2 whitespace-nowrap text-sm text-gray-500">
                                    </td> */}
                                </tr>
                            ))
                                : (
                                    <tr>
                                        <td colSpan={5} className='px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider'>No data Present</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    )
}

export default page