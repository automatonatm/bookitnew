import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useRouter} from "next/router";

import {toast} from "react-toastify";
import {Carousel} from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  moment from 'moment'


import {clearErrors} from "../../redux/actions/roomActions";
import Head from "next/head";
import Image from "next/image";
import RoomFeatures from "./RoomFeatures";
import axios from "axios";
import getStripe from "../../utils/getStripe";

import {checkBooking, getBookedDates} from "../../redux/actions/bookingActions";
import {CHECK_BOOKING_RESET} from "../../redux/constants/bookingConstants";


moment().format();



const RoomDetails = () => {

    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    const [daysOfStay, setDaysOfStay] = useState();
    const [paymentLoading, setPaymentLoading] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();



    const {room, errors} = useSelector(state => state.room);
    const {user, loading} = useSelector(state => state.loadedUser);
    const {available, loading:bookingLoading} = useSelector(state => state.checkBooking);
    const {dates, loading:loadingDates} = useSelector(state => state.bookedDates);

    const {id} = router.query;

    //convert dates from iso
    const excludedDates = [];
    dates.forEach(date => excludedDates.push(new Date(date)));


    useEffect(() => {

        dispatch(getBookedDates(id));

        if (errors) {
            toast.error(errors);
            dispatch(clearErrors())
        }


        return  () => {
            dispatch({type: CHECK_BOOKING_RESET})
        }



    }, [dispatch, id]);



   const onchangeHandler = (dates) => {

       const [checkInDate,  checkOutDate] = dates;

      setCheckInDate(checkInDate);
      setCheckOutDate(checkOutDate);

       if(checkInDate && checkOutDate) {

           const start = moment(checkInDate);
           const end = moment(checkOutDate);

           //console.log(start, end);

           setDaysOfStay(-moment.duration(start.diff(end)).asDays() + 1);

           //console.log(daysOfStay)

           dispatch(checkBooking(id, start, end))
       }
   };


   const newBookingHandler = async () => {
       const bookingDate = {
           room: router.query.id,
           checkInDate,
           checkOutDate,
           daysOfStay,
           amountPaid: 90,
           paymentInfo: {
               id: "STRIP_PAYMENT_ID",
               status: 'STRIPE_PAYMENT_STATUS'
           }
       };

       try {
           const config = {
               headers: {
                   'Content-Type': 'application/json'
               }
           };

           const {data} = await axios.post('/api/bookings', bookingDate, config);


       }catch (error) {
           toast.error(error.response.data.error.message)
       }


   };

   const bookRoom = async (id, pricePerNight) => {

       setPaymentLoading(true)
       const amount = pricePerNight * daysOfStay



       try {
           const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`

           const {data} = await axios.get(link, {params: {amount}})

           const stripe = await getStripe();

          // console.log(data)

           // Redirect to checkout
           stripe.redirectToCheckout({ sessionId: data.id })

       }catch (error) {
           setPaymentLoading(false)
           console.log(error)
           toast.error(error.message)
       }

   }

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

                         <hr/>
                        <p className="mt-5 mb-3">
                            Pick check In and Check out Date
                        </p>

                             <DatePicker

                                 className='w-100'
                                 selected={checkInDate}
                                 onChange={onchangeHandler}
                                 startDate={checkInDate}
                                 endDate={checkOutDate}
                                 selectsRange
                                 minDate={new Date()}
                                 inline
                                 excludeDates={excludedDates}
                             />


                            {available === true &&
                            <div className="alert alert-success my-3 font-weight-bold">Room is available. Book now.</div>
                            }

                            {available === false &&
                            <div className="alert alert-danger my-3 font-weight-bold">Room not available. Try different dates.</div>
                            }

                            {available && !user &&
                            <div className="alert alert-danger my-3 font-weight-bold">Login to book room.</div>
                            }

                            {available && user &&
                            <button
                                onClick={() => bookRoom(room.id, room.pricePerNight)}
                                className="btn btn-block py-3 booking-btn"
                                disabled={bookingLoading || paymentLoading}
                            >Pay - ${daysOfStay * room.pricePerNight}
                            </button>
                            }

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
