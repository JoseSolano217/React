export const Form = () => {
  return (
    <div className="d-flex justify-content-center" style={{ paddingTop: 20 }}>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title" style={{ color: "black" }}>
            Create a mod
          </h5>
          <form>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
              >
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="num1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label"
              >
                Dev team name
              </label>
              <input type="text" className="form-control" id="num2" />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label"
              >
                Mod Icon
              </label>
              <input type="file" className="form-control" id="num3" />
            </div>
            <button type="submit" className="btn btn-primary">Get started</button>
          </form>
        </div>
      </div>
    </div>
  );
};
