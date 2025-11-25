// import './App.css'
import Drawer from './components/commen/Drawer'
import Header from './components/commen/Header'
import MobileNavigation from './components/commen/MobileNavigation'
import Navigation from './components/layouts/Navigation'
import Sidebar from './components/layouts/Sidebar'
import {Routes,Route} from 'react-router-dom'
import HomeWrapper from './screens/HomeWrapper'
import Home from './components/layouts/Home'
import Shorts from './components/layouts/Shorts'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import CreateChannel from './components/channel/CreateChannel'
import ChannelScreen from './screens/ChannelScreen'
import CreateContent from './components/channel/CreateContent'
import UploadVideoPage from './components/video/UploadVideoPage'
import VideoDisplay from './components/video/VideoDisplay'
// import UploadVideoPage from './components/channel/UploadVideoPage'

function App() {
  return (
    <>
      {/* Navigation - Sab pages par dikhega */}
      <Navigation />
      
      {/* Routes */}
      <Routes>
        {/* HomeWrapper - Sidebar container */}
        <Route path='/' element={<HomeWrapper />}>
      
          <Route index element={<Home />} />
          {/* Child routes */}
          <Route path='home' element={<Home />} />
          <Route path='shorts' element={<Shorts />} />
          <Route path='/channel-screen/:id' element={<ChannelScreen/>}/>

        </Route>

        {/* Protected route list */}
<Route path='/login' element={<Login/>}></Route>
<Route path='/register' element={<Register/>}></Route>
<Route path='/create-channel' element={<CreateChannel/>}></Route>
<Route path='/create-content' element={<CreateContent/>}></Route>
<Route path='/create/upload-video' element={<UploadVideoPage/>}></Route>
<Route path='/watch/:id' element={<VideoDisplay/>}></Route>

      </Routes>


    </>
  )
}

export default App