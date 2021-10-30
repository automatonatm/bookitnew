import React from 'react';
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="page-not-found-wrapper">
            <h1 id="title_404">404</h1>
            <h3 id="description_404">
                Page Not not Found Go to <Link href="/">
                <a>Home Page</a>
            </Link>
            </h3>
        </div>
    );
};

export default NotFound;
