export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
    const defaultHeaders = { accept: "application/json" };
    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeaders, ...options.headers }
      : defaultHeaders;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    setTimeout(() => controller.abort(), 3000);

    return (
      fetch(endpoint, options)
        .then(
          (res) => {
            // console.log("+++++++++++++++++++++++++");
            // console.log(res.status);
            // console.log(res);
            // console.log(res.json());
            // console.log("+++++++++++++++++++++++++");
            // return Promise.all(Promise.resolve({ ok: res.ok }), res.json());
            // return Promise.resolve({
            //   ok: res.ok,
            //   status: res.status,
            //   body: res.ok
            //     ? res.json()
            //     : "A failure occurred during the communitation",
            // });
          }
          // res.ok
          //   ? res.json()
          //   : Promise.reject({
          //       err: true,
          //       status: res.status || "00",
          //       statusText:
          //         res.statusText ||
          //         "A failure occurred during the communication",
          //     })
        )
        .then((status, res) => {
          console.log("+++++++++++++++++++++++++");
          console.log(res.status);
          console.log(res);
          console.log("+++++++++++++++++++++++++");
          return res;
        })
        // .catch((err) => err);
        .catch((err) => {
          throw new Error(err);
        })
    );
  };
  const get = (url, options = {}) => customFetch(url, options);
  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };
  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };
  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };
  return {
    get,
    post,
    put,
    del,
  };
};
