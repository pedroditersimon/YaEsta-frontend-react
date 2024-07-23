import './App.css';
import '../css/generics.css';

import Main from "./Main.mjs";
import Navbar from '../components/Navbar/Navbar.mjs';
import messaging from '../Services/Google/firebase.mjs';
import { BrowserRouter , Route, Routes} from 'react-router-dom';

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Login, Register, Logout } from "../components/Forms/Auth.js";
import SearchChannelPanel from '../components/Channels/SearchChannelPanel.js';
import MyChannels from '../components/Channels/MyChannels.js';
import { CreateChannelForm } from '../components/Forms/CreateChannelForm.js';
import { CreateChannelEventForm } from '../components/Forms/CreateChannelEventForm.js';
import { CreateAccessDocumentForm } from '../components/Forms/CreateAccessDocumentForm.js';
import MyAccessDocuments from '../components/AccessDocuments/MyAccessDocuments.js';
import { AccessDocumentTrigger } from '../components/AccessDocuments/AccessDocumentTrigger.mjs';


export default function App() {
  return (
    <div className="App rows">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>hola</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/channels/create" element={<CreateChannelForm />} />
          <Route path="/channels/my" element={<MyChannels />} />
          <Route path="/channels/search" element={<SearchChannelPanel />} />

          <Route path="/events/create" element={<CreateChannelEventForm />} />

          <Route path="/access_documents/create" element={<CreateAccessDocumentForm />} />
          <Route path="/access_documents/my" element={<MyAccessDocuments />} />
          <Route path="/access_documents/trigger/:access_document_id" element={<AccessDocumentTrigger />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
