import React from 'react';
import Layout from "../../components/layout/Layout";
import MyBookings from "../../components/bookings/MyBookings";


import {wrapper} from "../../redux/store";

import {getSession} from "next-auth/client";
import {bookingDetails, myBookings} from "../../redux/actions/bookingActions";
import BookingDetails from "../../components/bookings/BookingDetails";

const BookingDetailsPage = () => {
    return (
        <Layout title='Booking Details'>
            <BookingDetails />
        </Layout>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(async ({ req, params, store }) => {

    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await store.dispatch(bookingDetails(req.headers.cookie, req, params.id))

})


export default BookingDetailsPage;
