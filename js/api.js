
const baseURL = "http://localhost:3000/api/";   //-------- (endpoints : products, categoriess, resevations)

//------------ url Creation Function

export const buildUrl = (endpoint, params) => {
  const url = new URL(baseURL + endpoint);
  //-- loop over each single keyparam from the params
  for (const key in params) {
    const value = params[key];

    if (Array.isArray(value)) {
      //-- ckeck if the a value is an array (for checked categories)
     for(let i=0; i<value.length;i++){
        url.searchParams.append(key, value[i])
     }
    } else if (value !== "" && value !== false) {
      //-- check if a query param is empty
      url.searchParams.set(key, value);
    }
  }
  return url;
};

//---- fetch All Data

export async function fetchData(endpoint, params = {}) {
  const url = buildUrl(endpoint, params);

  try {
    const response = await axios.get(url);
    return response
    
  } catch (err) {
    throw new Error(err.response);
  }
}

