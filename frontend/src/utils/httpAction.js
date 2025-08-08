import toast from "react-hot-toast";
const httpAction = async (data) => {
  try {
    const response = await fetch(data.url, {
      method: data.method ? data.method : "GET",
      body: data.body ? JSON.stringify(data.body) : null,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      credentials: 'include',
      cache: 'no-store'
    });

    const result = await response.json();

    if (!response.ok) {
//       const error= new Error(result?.message);
// error.statusCode =  response.status
//       throw error;
throw new Error(result?.message)
    }

    return result;

  } catch (error) {
  //   console.error(error);
  //  error.statusCode !== 403 && toast.error(error.message)
  toast.error(error.message)
  }
};

export default httpAction;


// import toast from "react-hot-toast";

// const httpAction = async (data) => {
//   try {
//     const response = await fetch(data.url, {
//       method: data.method || "GET",
//       body: data.body ? JSON.stringify(data.body) : null,
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       credentials: 'include',
//     });

//     const text = await response.text(); // raw response
//     let result;

//     try {
//       result = JSON.parse(text);
//     } catch (jsonError) {
//       console.error("JSON Parse Error:", jsonError);
//       throw new Error("Invalid JSON response from server");
//     }

//     if (!response.ok) {
//       throw new Error(result?.message || "Something went wrong");
//     }

//     return result;

//   } catch (error) {
//     console.error("Fetch Error:", error.message);
//     toast.error(error.message || "Unknown error occurred");
//   }
// };

// export default httpAction;
