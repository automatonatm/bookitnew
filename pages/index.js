import Layout from "../components/layout/Layout";
import HomePage from "../components/Home";
import React from "react";

import {getRooms} from "../redux/actions/roomActions";

import {wrapper} from "../redux/store";


export default function Home() {
  return (
   <Layout>
     <HomePage/>
   </Layout>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store, query }) => {

    await store.dispatch(getRooms(req, query.page, query.location, query.guests, query.category ))
});
