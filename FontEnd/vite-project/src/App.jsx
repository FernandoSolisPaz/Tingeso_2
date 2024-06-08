import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import NotFound from './components/NotFound'
import RegisterCar from "./components/RegisterCar.jsx";
import RegisterBrandBond from "./components/RegisterBrandBond.jsx";
import CarList from "./components/CarList.jsx";
import CarBrandList from "./components/CarBrandList.jsx";
import RegisterRepair from "./components/RegisterRepair.jsx";
import ReceiptList from "./components/ReceiptList.jsx";
import ReceiptEdit from "./components/ReceiptEdit.jsx";
import ReceiptShow   from "./components/ReceiptShow.jsx";
import ReportList from "./components/ReportList.jsx";
import ReportTypeRepair from "./components/ReportTypeRepair.jsx";
import ReportMotorRepair from "./components/ReportMotorRepair.jsx";
import ReportTimeRepair from "./components/ReportTimeRepair.jsx";
import RepairList from "./components/RepairList.jsx";
import RegisterNewRepair from "./components/RegisterNewRepair.jsx";

function App() {
  return (
      <Router>
          <div className="container">
              <Navbar></Navbar>
              <Routes>
                  <Route path="/home" element={<Home/>} />
                  <Route path="/cars/list" element={<CarList/>}/>
                  <Route path="/car_brand/list" element={<CarBrandList/>}/>
                  <Route path="/cars/add" element={<RegisterCar/>} />
                  <Route path="/cars/edit/:plateURL" element={<RegisterCar/>}/>
                  <Route path="/car_brand/register" element={<RegisterBrandBond/>} />
                  <Route path="/car_brand/edit/:id" element={<RegisterBrandBond/>}/>
                  <Route path="/repair/register" element={<RegisterRepair/>}/>
                  <Route path="/receipts/list/:carPlate" element={<ReceiptList/>}/>
                  <Route path="/receipts/edit/:id" element={<ReceiptEdit/>}/>
                  <Route path="/receipts/details/:id" element={<ReceiptShow/>}/>
                  <Route path="/repairs/list" element={<RepairList/>}/>
                  <Route path="/repairs/add" element={<RegisterNewRepair/>}/>
                  <Route path="/repairs/edit/:repairURL" element={<RegisterNewRepair/>}/>
                  <Route path="/report/list" element={<ReportList />}/>
                  <Route path="/reportTypeRepair" element={<ReportTypeRepair/>}/>
                  <Route path="/reportMotorRepair" element={<ReportMotorRepair/>}/>
                  <Route path="/reportTimeRepair" element={<ReportTimeRepair/>}/>
                  <Route path="*" element={<NotFound/>} />
              </Routes>
          </div>
      </Router>
  )
}

export default App
