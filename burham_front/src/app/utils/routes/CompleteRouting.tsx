import { Signin } from "../../views/public/Signin"; 
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../../views/public/Login";
import { NotFound } from "../../views/shared/NotFound";
import { MainBoard } from "../../containers/MainBoard";

const LazilyLogingIn = lazy(() =>
  import("../../views/public/Login").then(() => ({ default: Login }))
);
const LazilySigningIn = lazy(() =>
  import("../../views/public/Signin").then(() => ({ default: Signin }))
);
const LazilyUndefined = lazy(() =>
  import("../../views/shared/NotFound").then(() => ({ default: NotFound }))
);
const LazilyBoarding = lazy(() =>
  import("../../containers/MainBoard").then(() => ({ default: MainBoard }))
);

export const CompleteRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<LazilyLogingIn/>} />
      <Route path="/login" element={<LazilyLogingIn/>} />
      <Route path="/signin" element={<LazilySigningIn/>}/>
      
      <Route path="/home/*" element={<LazilyBoarding/>}></Route>

      <Route path="*" element={<LazilyUndefined/>}/>
    </Routes>
  );
};
