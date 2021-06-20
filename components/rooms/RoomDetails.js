import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {Carousel} from "react-bootstrap";

import {clearErrors} from "../../redux/actions/roomActions";
import Head from "next/head";
import Image from "next/image";
import RoomFeatures from "./RoomFeatures";


const RoomDetails = () => {

    const dispatch = useDispatch();

    const {room, errors} = useSelector(state => state.room);

    useEffect(() => {
        if (errors) {
            toast.error(errors);
            dispatch(clearErrors())
        }

    }, [dispatch]);


    return (
        <>
            <Head>
                <title>{room.name} - BookIt</title>
            </Head>
            <div className="container container-fluid">
                <h2 className='mt-5'>{room.name}</h2>

                <div className="ratings mt-auto mb-3">
                    <div className="rating-outer">
                        <div
                            className="rating-inner"
                            style={{width: `${(room.rating) / 5 * 100}%`}}
                        />
                    </div>
                    <span id="no_of_reviews">({room.numOfPreviews} Reviews)</span>
                </div>

                {/*   {
                   room.images  &&  (
                       room.images.map(image =>  <Image
                           src={image.url}
                           className="d-block w-100 property-details-image m-auto"
                           alt="Hotel"
                           alt={room.name}
                           key={image.public_id}
                           layout='fill' />)
                   )
               }*/}

               <Carousel hover="pause">
                   {
                       room.images && room.images.map(image => (
                           <Carousel.Item key={image.public_id}>
                               <div style={{width: '100%', height: '440px'}}>
                                   <Image
                                       className="d-block m-auto"
                                       src={image.url}
                                       alt={room.name}
                                       layout='fill'
                                   />
                               </div>
                           </Carousel.Item>
                       ))
                   }
               </Carousel>




                <div className="row my-5">
                    <div className="col-12 col-md-6 col-lg-8">
                        <h3>Description</h3>
                        <p>
                            {room.description}
                        </p>

                        <RoomFeatures room={room}/>


                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="booking-card shadow-lg p-4">
                            <p className='price-per-night'><b>${room.pricePerNight}</b> / night</p>

                            <button className="btn btn-block py-3 booking-btn">Pay</button>

                        </div>
                    </div>
                </div>


                <div className="reviews w-75">
                    <h3>Reviews:</h3>
                    <hr/>
                    <div className="review-card my-3">
                        <div className="rating-outer">
                            <div className="rating-inner"></div>
                        </div>
                        <p className="review_user">by John</p>
                        <p className="review_comment">Good Quality</p>

                        <hr/>
                    </div>

                    <div className="review-card my-3">
                        <div className="rating-outer">
                            <div className="rating-inner"></div>
                        </div>
                        <p className="review_user">by John</p>
                        <p className="review_comment">Good Quality</p>

                        <hr/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoomDetails;
