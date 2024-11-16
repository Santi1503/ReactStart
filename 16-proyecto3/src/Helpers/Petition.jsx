export const Petition = async (url, method, saveData = "", files = false) => {
  let loading = true;

  let options = {
    method: "GET",
  };

  if (method == "DELETE" || method == "GET") {
    options = {
      method: method,
    };
  }

  if (method == "POST" || method == "PUT") {
    if (files) {
      options = {
        method: method,
        body: saveData,
      };
    } else {
      options = {
        method: method,
        body: JSON.stringify(saveData),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  }

  const petition = await fetch(url, options);
  const data = await petition.json();

  loading = false;

  return {
    data,
    loading,
  };
};
