import React from "react";
import './App.css';
import Create from "./components/Create";
import { Route, Routes } from "react-router-dom";
import Edit from "./components/Edit";
import Navbar from "./components/Navbar";
import RecordList from "./components/RecordList";

function App() {

  return (
    <div className="App">
    <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
    </div>
  );
}

export default App;
