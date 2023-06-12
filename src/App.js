import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Book from './pages/Book'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Confirmation from './pages/Confirmation'
import ResetPass from './pages/ResetPass'
import ServiceList from './components/ServiceList'
import Demography from './components/Demography'
import History from './components/History'
import HealthBg from './components/HealthBg'
import TimeSlot from './components/TimeSlot'
import Summary from './components/Summary'
import { ToastContainer } from 'react-toastify';
import { SkeletonTheme } from 'react-loading-skeleton';
import { AuthModalContextProvider } from './context/AuthModalContext';

function App() {

  return (
    <div className="App">
      <SkeletonTheme baseColor="#e3e3e3" highlightColor="#c1c1c1">
        <BrowserRouter>
          <AuthModalContextProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/BookNow/" element={<Book/>}>
                <Route path="ServiceDetails" element={<ServiceList/>}/>
                <Route path="TimeSlot" element={<TimeSlot/>}/>
                <Route path="Summary" element={<Summary/>}/>
              </Route>
              <Route path="/ContactUs" element={<Contact/>}/>
              <Route path="/Profile/" element={<Profile/>}>
                <Route index element={<Demography/>}/>
                <Route path="Health_Background" element={<HealthBg/>}/>
                <Route path="Treatment_Record" element={<History/>}/>
              </Route>
              <Route path="/Confirm/:confirmation_code" element={<Confirmation/>}/>
              <Route path="/Reset/:page/:confirmation_code" element={<ResetPass/>}/>
            </Routes>
          </AuthModalContextProvider>
        </BrowserRouter>
      </SkeletonTheme>
    </div>
  );
}

export default App;
