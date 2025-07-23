import HomePage from "./components/HomePage.tsx";
import EscursioniMaps from "./components/EscursioniMaps.tsx";
import EscursioniData from "./components/EscursioniData.tsx";
import Header from "./components/Header.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Gallery from "./components/Gallery.tsx";
import Admin from "./components/Admin.tsx";


function App() {

  return (
      <BrowserRouter>
          <div className="relative h-full w-full bg-gradient-to-b from-white to-emerald-50">
              <Header/>
              <Routes>
                  <Route path="/" element={
                      <>
                          <HomePage/>
                          <EscursioniMaps/>
                          <EscursioniData/>
                      </>
                  }
                  />
                  <Route path="/gallery" element={<Gallery/>} />
                  <Route path="/gallery" element={<Gallery/>} />
                  <Route path="/admin" element={<Admin/>} />
              </Routes>
          </div>
      </BrowserRouter>
  )
}

export default App
