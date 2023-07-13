import { Route, Routes } from "react-router-dom";
import { Crear } from "../../componentes/camisetas/Crear";
import { Listar } from "../../componentes/camisetas/Listar";

export const Ruteo = () => {
    return (
        <Routes>
            <Route path="/catalogue" element={<Listar/>}/>
            <Route path="/create" element={<Crear/>}/>
            <Route path="/admin" element={<Crear/>}/>
        </Routes>
    )
}