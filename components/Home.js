import React, {useEffect} from 'react';
import {useRouter} from  'next/router'
import {useSelector, useDispatch} from "react-redux";
import Room from "./rooms/Room";
import {toast} from "react-toastify";
import {clearErrors} from "../redux/actions/roomActions";
import Pagination from 'react-js-pagination'
import Link from "next/link";

const Index = () => {

    const dispatch = useDispatch();

    const router = useRouter()

    let {page = 1, location} = router.query;

    page = Number(page)

     const {rooms, resPerPage, filteredRoomsCount, count, errors} = useSelector(state => state.rooms);

     useEffect(() => {
         if(errors) {
             toast.error(errors);
             dispatch(clearErrors())
         }
     }, [dispatch]);


     const paginationHandler = (pageNumber) => {
         window.location.href = `/?page=${pageNumber}`
     };

     let roomCount  =  count

    if(location) {
       roomCount = filteredRoomsCount
    }


    return (
        <>
        <section id="rooms" className="container mt-5">

            <h2 className='mb-3 ml-2 stays-heading'>{
                location ?  `Rooms in ${location}` : 'All Rooms'
            }</h2>

            <Link href={'/search'} >
            <a className="ml-2 back-to-search">
                <i className="fa fa-arrow-left"/>
                Back to Search </a>
            </Link>
            <div className="row">

                {
                    rooms && rooms.length === 0 ?
                        <div className="alert alert-danger">No Rooms Found</div>
                        :
                       rooms && rooms.map(room => <Room  room={room} key={room.id}/>)
                }

            </div>
        </section>
            {
                resPerPage < roomCount &&
                <div className="d-flex justify-content-center mt-5">
                <Pagination
                    activePage={page}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={count}
                    onChange={paginationHandler}
                    nextPageText={'Next'}
                    prevPageText={'Prev'}
                    firstPageText={'First'}
                    lastPageText={'Last'}
                    itemClass="page-item"
                    linkClass="page-link"
                />
                </div>
            }

            </>


    );
};

export default Index;
