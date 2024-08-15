import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
import './App.css'
import LandingPage from './pages/Landing'
import { RegisterComponent } from './pages/Doctor/register'
import { SigninDoctor } from './pages/Doctor/signin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {RecoilRoot } from "recoil"
import { DoctorDashBoard } from './pages/Doctor/dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RecoilRoot>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/doctorssignup" element={<RegisterComponent/>}></Route>
          <Route path="/doctorssignin" element={<SigninDoctor />}></Route>
          <Route path="/doctordashboard" element={<DoctorDashBoard/>}></Route>
          {/* <Route path="/home" element={<Home />}></Route>
          <Route path="/turfs" element={<Turfs/>}></Route>
          <Route path="/book" element={<Book/>}></Route>
          <Route path="/booked" element={<Booked />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/tournaments" element={<Tournaments />}></Route>
          <Route path="/tournamentbook" element={<TournamentDetail />}></Route> */}
        </Routes>
      </BrowserRouter>

    </RecoilRoot>
    </>
  )
}

export default App
