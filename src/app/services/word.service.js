import httpServise from "./http.services";

const userEndpoint = "/words/";

const wordServisece = {
  get: async (group, page) => {
    const { data } = await httpServise.get(
      userEndpoint + `?group=${group}&page=${page}`
    );
    return data;
  }
};

export default wordServisece;
