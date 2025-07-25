import HomePage from "./components/HomePage.tsx";
import EscursioniMaps from "./components/EscursioniMaps.tsx";
import UltimeEscursioni from "./components/UltimeEscursioni.tsx";
import Header from "./components/Header.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Gallery from "./components/Gallery.tsx";
import AdminFileGpx from "./components/AdminFileGpx.tsx";
import ArchivoEscursioni from "./components/ArchivioEscursioni.tsx";


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
                          <UltimeEscursioni/>
                      </>
                  }
                  />
                  <Route path="/gallery" element={<Gallery/>} />
                  <Route path="/escursioni" element={<ArchivoEscursioni/>} />
                  <Route path="/admin" element={<AdminFileGpx/>} />
              </Routes>
          </div>
      </BrowserRouter>
  )
}

export default App
