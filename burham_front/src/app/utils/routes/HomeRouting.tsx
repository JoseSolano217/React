import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import { AdminType } from "../../views/private/burgertypes/AdminTypes";
import { CreateType } from "../../views/private/burgertypes/CreateType";
import { DetailType } from "../../views/private/burgertypes/DetailType";

import { AdminDimention } from "../../views/private/burgerdimentions/AdminDimentions";
import { CreateDimention } from "../../views/private/burgerdimentions/CreateDimention";
import { DetailDimention } from "../../views/private/burgerdimentions/DetailDimention";

import { About } from "../../views/private/burgers/About";
import { AdminUser } from "../../views/private/burgers/AdminBurgers";
import { CreateUser } from "../../views/private/burgers/CreateUser";
import { DetailUser } from "../../views/private/burgers/DetailUser";
import { ListUser } from "../../views/private/burgers/ListUser";
import { UpdateUser } from "../../views/private/burgers/UpdateUser";

import { Welcum } from "../../containers/Welcum";
import { NotFound } from "../../views/shared/NotFound";

const LazilyAdministrating = lazy(() => 
  import("../../views/private/burgertypes/AdminTypes").then(() => ({default: AdminType}))
);
const LazilyCreating = lazy(() =>
  import("../../views/private/burgertypes/CreateType").then(() => ({ default: CreateType }))
);
const LazilyDetailing = lazy(() =>
import("../../views/private/burgertypes/DetailType").then(() => ({ default: DetailType }))
);

const LazilyAbout = lazy(() =>
  import("../../views/private/burgers/About").then(() => ({ default: About }))
);
const LazilyAdministratingUsers = lazy(() =>
  import("../../views/private/burgers/AdminBurgers").then(() => ({ default: AdminUser }))
);
const LazilyCreatingUsers = lazy(() =>
  import("../../views/private/burgers/CreateUser").then(() => ({ default: CreateUser }))
);
const LazilyDetailingUsers = lazy(() =>
  import("../../views/private/burgers/DetailUser").then(() => ({ default: DetailUser }))
);
const LazilyListingUsers = lazy(() =>
  import("../../views/private/burgers/ListUser").then(() => ({ default: ListUser }))
);
const LazilyUpdatingUsers = lazy(() =>
  import("../../views/private/burgers/UpdateUser").then(() => ({ default: UpdateUser }))
);

const LazilyWelcum = lazy(() =>
  import("../../containers/Welcum").then(() => ({ default: Welcum }))
);
const LazilyUndefined = lazy(() =>
  import("../../views/shared/NotFound").then(() => ({ default: NotFound }))
);

export const HomeRouting = () => {
  return (
    <Routes>
      <Route path="/welcum" element={<LazilyWelcum/>} />
      <Route path="/about" element={<LazilyAbout/>} />


      <Route path="/admin" element={<LazilyAdministrating/>} />
      <Route path="/create" element={<LazilyCreating/>} />
      <Route path="/detail/:code" element={<LazilyDetailing/>} />


      <Route path="/adminusers" element={<LazilyAdministratingUsers/>} />
      <Route path="/createusers" element={<LazilyCreatingUsers/>} />
      <Route path="/detailusers/:code" element={<LazilyDetailingUsers/>} />
      <Route path="/listusers" element={<LazilyListingUsers/>} />
      <Route path="/updateusers/:code" element={<LazilyUpdatingUsers/>} />


      <Route path="*" element={<LazilyUndefined/>}/>
    </Routes>
  );
};
