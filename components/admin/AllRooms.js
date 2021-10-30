import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {clearErrors, getRooms} from "../../redux/actions/adminRoomActions";
import {MDBDataTable} from "mdbreact";
import Link from "next/link";
import {useRouter} from "next/router";

import Loader from "../layout/Loader";


const AllRooms = () => {

    const dispatch = useDispatch();
    const router = useRouter()

    const { loading, errors, rooms } = useSelector(state => state.adminRooms);

    useEffect(() => {


        dispatch(getRooms())

        if (errors) {
            toast.error(errors);
            dispatch(clearErrors())
        }
    }, [])


    const setRooms = () => {
        const data = {
            columns: [
                {
                    label: 'Room ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price / Night',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }

            ],
            rows: []
        }

        rooms && rooms.forEach(room => {

            data.rows.push({
                id: room.id,
                name: room.name,
                price: room.pricePerNight,
                category: room.category,

                actions:
                    <>
                        <Link href={`/admin/rooms/${room.id}`}>
                            <a className="btn btn-primary">
                                <i className="fa fa-pencil"/>
                            </a>
                        </Link>

                        <button className="btn btn-danger mx-2" onClick={() => {}}>
                            <i className="fa fa-trash"/>
                        </button>

                    </>
            })
        })

        return data;

    }



    return (
        <div className='container container-fluid'>
            {loading ? <Loader/> : (
                <>

                    <h1 className='my-5'>{`${rooms && rooms.length} Rooms`}</h1>

                    <Link href="/admin/create-room">
                        <a className="mt-0 btn text-white float-right new-room-btn">Create Room</a>
                    </Link>

                    <MDBDataTable
                        data={setRooms()}
                        className='px-3'
                        bordered
                        striped
                        hover
                    />

                </>
            )}


        </div>
    );
};

export default AllRooms;
