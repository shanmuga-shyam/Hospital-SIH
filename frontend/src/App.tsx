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
import { SignAdmin } from './pages/Admin/signin';
import { Register } from './pages/Admin/register';
import {Admindashboard} from './pages/Admin/dashboard';
import {InventoryLogin} from './pages/inventory/login';
import { InventoryRegister } from './pages/inventory/register';
import {MainStore} from './pages/inventory/mainstore';
import { Substore } from './pages/inventory/substore';
import { Pharmacy } from './pages/inventory/pharmacy';
import { Ward } from './pages/inventory/ward';

function App() {

  return (
    <>
      <RecoilRoot>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/doctorssignup" element={<RegisterComponent/>}></Route>
          <Route path="/doctorssignin" element={<SigninDoctor />}></Route>
          <Route path="/doctordashboard" element={<DoctorDashBoard/>}></Route>
          <Route path="/adminsignin" element={<SignAdmin/>}/>
          <Route path="/adminsignup" element={<Register/>}/>
          <Route path="/admindashboard" element={<Admindashboard/>}/>
          <Route path="/inventorysignin" element={<InventoryLogin/>}/>
          <Route path="/inventorysignup" element={<InventoryRegister/>}/>
          <Route path="/mainstore" element={<MainStore/>}/>
          <Route path="/substore" element={<Substore/>}/>
          <Route path="/pharmacy" element={<Pharmacy/>}/>
          <Route path="/ward" element={<Ward/>}/>
        </Routes>
      </BrowserRouter>

    </RecoilRoot>
    </>
  )
}

export default App
