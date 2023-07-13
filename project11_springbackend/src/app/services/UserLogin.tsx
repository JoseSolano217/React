class UserLogin {
  public static async consume(urlApi: string, myObj: any) {
    const info = {
      method: "POST",
      body: JSON.stringify(myObj),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    };
    const resultApi = fetch(urlApi, info)
      .then((getInfo) => getInfo.json())
      .then((myInfo) => { return myInfo; })
      .catch((e) => { return e; });
    return resultApi;
  }
}

export default UserLogin;
