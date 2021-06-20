import Layout from "../components/layout/Layout";

import React from "react";

import Login from "../components/auth/Login";
import {getSession} from "next-auth/client";


export default function SearchPage() {
    return (
        <Layout title="Login">
            <Login/>
        </Layout>
    )
}



export const getServerSideProps =  async (context) => {

    const sesssion = await getSession({req: context.req});

    if(sesssion) {

        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }

};

