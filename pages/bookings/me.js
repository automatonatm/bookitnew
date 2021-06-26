import React from 'react';
import Layout from "../../components/layout/Layout";
import MyBookings from "../../components/bookings/MyBookings";


import {wrapper} from "../../redux/store";

import {getSession} from "next-auth/client";
import {myBookings} from "../../redux/actions/bookingActions";

const Me = () => {
    return (
        <Layout title='My Bookings'>
            <MyBookings />
        </Layout>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store }) => {

    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await store.dispatch(myBookings(req.headers.cookie, req))

})


export default Me;
