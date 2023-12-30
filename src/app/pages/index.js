// import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import Home from './Home/Home'
// import Navbar from '../components/NavBar'

// function App() {

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Navbar />
//         <div className="pages">
//           <Routes>
//             <Route 
//               path="/" 
//               element={<Home />} 
//             />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </div>   
//   );
// }
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '.';
import { NotesContextProvider } from './context/NotesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <NotesContextProvider>
      <App />
    </NotesContextProvider>
  </React.StrictMode>
);
