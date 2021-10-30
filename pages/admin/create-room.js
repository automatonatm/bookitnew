import React from 'react';
import Layout from "../../components/layout/Layout";
import AllRooms from "../../components/admin/AllRooms";
import {getSession} from "next-auth/client";
import NewRoom from "../../components/admin/NewRoom";

const NewRoomPage = () => {
    return (
        <Layout>
            <NewRoom/>
        </Layout>
    );
};

export default NewRoomPage;

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
