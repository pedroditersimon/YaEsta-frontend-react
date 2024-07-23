import './App.css';
import '../css/generics.css';

import Main from "./Main.mjs";
import Navbar from '../components/Navbar/Navbar.mjs';
import messaging from '../Services/Google/firebase.mjs';
import { BrowserRouter , Route, Routes} from 'react-router-dom';

export default function App() {
  return (
    <div className="App rows">
      <BrowserRouter>
        <Navbar />
        <Main />
      </BrowserRouter>
    </div>
  );
}
