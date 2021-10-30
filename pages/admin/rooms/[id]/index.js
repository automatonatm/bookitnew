import React from 'react';
import Layout from "../../../../components/layout/Layout";
import UpdateRoom from "../../../../components/admin/UpdateRoom";
import {getSession} from "next-auth/client";

const UpdateRoomPage = () => {
    return (
        <Layout>
            <UpdateRoom/>
        </Layout>
    );
};

export default UpdateRoomPage;

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
