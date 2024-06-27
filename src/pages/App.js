import './App.css';
import '../css/generics.css';

import Main from "./Main.mjs";
import Navbar from '../components/Navbar/Navbar.mjs';

export default function App() {
  return (
    <div className="App rows">
      <Navbar />
      <Main />
    </div>
  );
}
