import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { Home } from "../Components/Home"
import { Portfolio } from "../Components/Portfolio"
import { Services } from "../Components/Services"
import { Curriculum } from "../Components/Curriculum"
import { Contact } from "../Components/Contact"
import { HeaderNav } from '../Components/layout/HeaderNav'
import { Footer } from '../Components/layout/Footer'
import { Proyecto } from '../Components/Proyecto'

export const MyRoutes = () => {
  return (
    <BrowserRouter>
        <HeaderNav />

        <section className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/portfolio" element={<Portfolio />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/curriculum" element={<Curriculum />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/proyecto/:id" element={<Proyecto />}></Route>
            <Route path="*" element={
              <div className='page'>
                <h1 className='heading'>Error 404</h1>
              </div>
            }></Route>
          </Routes>
        </section>

        <Footer />

    </BrowserRouter>
  )
}
