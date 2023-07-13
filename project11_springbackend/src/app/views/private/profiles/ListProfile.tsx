import { useEffect, useState } from "react";
import Profile from "../../../models/Profile";
import PrivateService from "../../../services/PrivateService";
import ApiBack from "../../../utils/doms/ApiBack";

export const ListProfile = () => {
  const [profileArray, setProfileArray] = useState<Profile[]>([]);

  const handOverTheProfiles = async () => {
    const result = await PrivateService.GETs(
      ApiBack.PUBLIC_PROFILE + ApiBack.READ
    );
    setProfileArray(result);
  };

  useEffect(() => {
    handOverTheProfiles();
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Profiles</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Start</a>
            </li>
            <li className="breadcrumb-item active">List profiles</li>
          </ol>
        </nav>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Order</th>
                  <th style={{ width: "50%" }}>Profile Name</th>
                  <th style={{ width: "15%" }}>State</th>
                  <th className="text-center" style={{ width: "15%" }}>
                    Users
                  </th>
                </tr>
              </thead>
              <tbody>
                {profileArray.map((profile, count) => (
                  <tr key={count}>
                    <td>{count + 1}</td>
                    <td>{profile.profilename}</td>
                    <td>{profile.state === 1 ? "Active" : "Inactive"}</td>
                    <td className="text-center">{profile.userQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};
