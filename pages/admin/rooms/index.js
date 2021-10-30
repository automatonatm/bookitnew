import React from 'react';
import Layout from "../../../components/layout/Layout";
import AllRooms from "../../../components/admin/AllRooms";
import {getSession} from "next-auth/client";

const AllRoomsPage = () => {
    return (
        <Layout>
            <AllRooms/>
        </Layout>
    );
};

export default AllRoomsPage;

export const getServerSideProps =  async (context) => {

    const sesssion = await getSession({req: context.req})

    if(!sesssion || sesssion.user.role !== 'admin') {

        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }

};
