import ApiBack from "../utils/doms/ApiBack";

class PrivateService {
    public static async GETs(urlService: string) {
        const bearer = "Bearer " + String(localStorage.getItem("tokenUSTA"));
    
        const sendData = {
          method: "GET",
          headers: { "Content-Type": "application/json; charset=UTF-8", authorization: bearer }
        };
    
        const url = ApiBack.URL + urlService;
        const response = fetch(url, sendData)
          .then((response) => response.json())
          .then((data) => { return data; })
          .catch((e) => { return e; });
        return response;
      }
    
      public static async POSTs(urlService: string, myJSON: any) {
        const bearer = "Bearer " + String(localStorage.getItem("tokenUSTA"));
    
        const sendData = {
          method: "POST",
          body: JSON.stringify(myJSON),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            authorization: bearer
          }
        };
    
        const url = ApiBack.URL + urlService;
        const response = fetch(url, sendData)
          .then((response) => response.json())
          .then((data) => { return data; })
          .catch((e) => { return e; });
        return response;
      }
    
      public static async DELETEs(urlService: string) {
        const bearer = "Bearer " + String(localStorage.getItem("tokenUSTA"));
    
        const sendData = { method: "DELETE", headers: { "Content-Type": "application/json; charset=UTF-8", authorization: bearer } };
    
        const url = ApiBack.URL + urlService;
        const response = fetch(url, sendData)
          .then((response) => response.json())
          .then((data) => { return data; })
          .catch((e) => { return e; });
        return response;
      }
    
      public static async PUTs(urlService: string, myJSON: any) {
        const bearer = "Bearer " + String(localStorage.getItem("tokenUSTA"));
    
        const sendData = {
          method: "PUT",
          body: JSON.stringify(myJSON),
          headers: { "Content-Type": "application/json; charset=UTF-8", authorization: bearer }
        };
    
        const url = ApiBack.URL + urlService;
        const response = fetch(url, sendData)
          .then((response) => response.json())
          .then((data) => { return data; })
          .catch((e) => { return e; });
        return response;
      }
}

export default PrivateService;