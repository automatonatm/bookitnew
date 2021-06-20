import Layout from "../../components/layout/Layout";
import Profile from "../../components/user/Profile";

import React from "react";

import {getSession} from "next-auth/client";


const  Update = () => {
    return (
        <Layout  title="My Account">
            <Profile />
        </Layout>
    )
}


export const getServerSideProps =  async (context) => {

    const sesssion = await getSession({req: context.req})

    if(!sesssion) {

        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: sesssion
    }

};

export default Update
