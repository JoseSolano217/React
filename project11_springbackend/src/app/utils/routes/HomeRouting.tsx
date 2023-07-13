import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import { AdminProfile } from "../../views/private/profiles/AdminProfile";
import { CreateProfile } from "../../views/private/profiles/CreateProfile";
import { DetailProfile } from "../../views/private/profiles/DetailProfile";
import { ListProfile } from "../../views/private/profiles/ListProfile";
import { UpdateProfile } from "../../views/private/profiles/UpdateProfile";

import { About } from "../../views/private/users/About";
import { AdminUser } from "../../views/private/users/AdminUser";
import { CreateUser } from "../../views/private/users/CreateUser";
import { DetailUser } from "../../views/private/users/DetailUser";
import { ListUser } from "../../views/private/users/ListUser";
import { UpdateUser } from "../../views/private/users/UpdateUser";

import { Welcum } from "../../containers/Welcum";
import { NotFound } from "../../views/shared/NotFound";

const LazilyAdministrating = lazy(() => 
  import("../../views/private/profiles/AdminProfile").then(() => ({default: AdminProfile}))
);
const LazilyCreating = lazy(() =>
  import("../../views/private/profiles/CreateProfile").then(() => ({ default: CreateProfile }))
);
const LazilyDetailing = lazy(() =>
import("../../views/private/profiles/DetailProfile").then(() => ({ default: DetailProfile }))
);
const LazilyListing = lazy(() =>
  import("../../views/private/profiles/ListProfile").then(() => ({ default: ListProfile }))
);
const LazilyUpdating = lazy(() =>
  import("../../views/private/profiles/UpdateProfile").then(() => ({ default: UpdateProfile }))
);

const LazilyAbout = lazy(() =>
  import("../../views/private/users/About").then(() => ({ default: About }))
);
const LazilyAdministratingUsers = lazy(() =>
  import("../../views/private/users/AdminUser").then(() => ({ default: AdminUser }))
);
const LazilyCreatingUsers = lazy(() =>
  import("../../views/private/users/CreateUser").then(() => ({ default: CreateUser }))
);
const LazilyDetailingUsers = lazy(() =>
  import("../../views/private/users/DetailUser").then(() => ({ default: DetailUser }))
);
const LazilyListingUsers = lazy(() =>
  import("../../views/private/users/ListUser").then(() => ({ default: ListUser }))
);
const LazilyUpdatingUsers = lazy(() =>
  import("../../views/private/users/UpdateUser").then(() => ({ default: UpdateUser }))
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
      <Route path="/list" element={<LazilyListing/>} />
      <Route path="/update/:code" element={<LazilyUpdating/>} />


      <Route path="/adminusers" element={<LazilyAdministratingUsers/>} />
      <Route path="/createusers" element={<LazilyCreatingUsers/>} />
      <Route path="/detailusers/:code" element={<LazilyDetailingUsers/>} />
      <Route path="/listusers" element={<LazilyListingUsers/>} />
      <Route path="/updateusers/:code" element={<LazilyUpdatingUsers/>} />


      <Route path="*" element={<LazilyUndefined/>}/>
    </Routes>
  );
};
