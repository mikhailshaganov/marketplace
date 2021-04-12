import React from 'react';
import Footer from './ComponentsUI/Panels/Footer';
import MenuAppBar from './ComponentsUI/Panels/Header';
import Main from './Pages/Main';
import HeaderSearch from './ComponentsUI/Panels/HeaderSearch';

export default function App() {

    return (
        <div>
            <MenuAppBar />
            <HeaderSearch />
            <div style={{ minHeight: "900px" }}>
                <Main />
            </div>
            <Footer />
        </div>
    );
}