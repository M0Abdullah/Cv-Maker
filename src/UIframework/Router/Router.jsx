import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Resumegenerator from '../../Interface/Resumegenerator/Resumegenerator';
 import Mainpage from '../../Interface/Mainpage/Mainpage'
import Usertemplate from '../../Interface/ Template/Usertemplate';
import Usertemplate2 from '../../Interface/ Template/Usertemplate2';
import Usertemplate3 from '../../Interface/ Template/Usertemplate3';
import Usertemplate4 from '../../Interface/ Template/Usertemplate4';
import UserTemplate5 from '../../Interface/ Template/Usertemplate5';
export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Mainpage />} /> 
                <Route path='/Resumegenerator' element={<Resumegenerator />} />
                <Route path='/Usertemplate' element={<Usertemplate />} />
                <Route path='/Usertemplate2' element={<Usertemplate2 />} />
                <Route path='/Usertemplate3' element={<Usertemplate3 />} />
                <Route path='/Usertemplate4' element={<Usertemplate4 />} />
                <Route path='/UserTemplate5' element={<UserTemplate5 />} />
            </Routes>
        </Router>
    );
}
