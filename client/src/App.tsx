import HomePage from "./components/HomePage.tsx";
import EscursioniMaps from "./components/EscursioniMaps.tsx";
import EscursioneRecenti from "./components/EscursioneRecenti.tsx";
import NavBar from "./components/NavBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Gallery from "./components/Gallery.tsx";
import AdminFileGpx from "./components/AdminFileGpx.tsx";
import ArchivoEscursioni from "./components/ArchivioEscursioni.tsx";
import AboutMe from "./components/AboutMe.tsx";


function App() {

  return (
      <BrowserRouter>
          <div className="relative h-full w-full bg-gradient-to-b from-white to-emerald-50">
              <NavBar/>
              <Routes>
                  <Route path="/" element={
                      <>
                          <HomePage/>
                          <EscursioniMaps/>
                          <EscursioneRecenti/>
                      </>
                  }
                  />
                  <Route path="/gallery" element={<Gallery/>} />
                  <Route path="/escursioni" element={<ArchivoEscursioni/>} />
                  <Route path="/contatti" element={ <AboutMe/> } />
                  <Route path="/admin" element={<AdminFileGpx/>} />
              </Routes>
          </div>
      </BrowserRouter>
  )
}

export default App
