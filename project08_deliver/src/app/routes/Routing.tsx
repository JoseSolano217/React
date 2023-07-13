import { Route, Routes } from "react-router-dom";
import { Body } from "../components/Body";
import { Form } from "../components/Form";
import { Manage } from "../components/Manage";

export const Routing = () => {
    return (
        <Routes>
            <Route path="/catalogue" element={<Body/>}/>
            <Route path='/create' element={<Form/>}/>
            <Route path="/manage" element={<Manage/>}/>
        </Routes>
    )
}