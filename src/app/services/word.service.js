import httpServise from "./http.services";

const userEndpoint = "/words/";

const wordServisece = {
  get: async () => {
    const { data } = await httpServise.get(userEndpoint);
    console.log(data);
    return data;
  }
};

export default wordServisece;
