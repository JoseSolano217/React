import { Route, Routes } from "react-router-dom";
import { Body } from "../../components/Body";
import { CreateForm } from "../../components/CreateForm";
import { Manage } from "../../components/Manage";
import { Update } from "../../components/Update";

export const Routing = () => {
    return (
        <Routes>
            <Route path="/catalogue" element={<Body/>}/>
            <Route path='/create' element={<CreateForm/>}/>
            <Route path="/manage" element={<Manage/>}/>
            <Route path="/update/:cokeCode" element={<Update/>}/>
        </Routes>
    )
}