import toast from "react-hot-toast";
const httpAction = async (data) => {
  try {
    const response = await fetch(data.url, {
      method: data.method || "GET",
      body: data.body ? JSON.stringify(data.body) : null,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      credentials: 'include',
      cache: 'no-store'
    });

    const raw = await response.text();
    let result;
    try {
      result = raw ? JSON.parse(raw) : {};
    } catch (e) {
    
      throw new Error(response.statusText || 'Invalid server response');
    }

    if (!response.ok) {
      throw new Error(result?.message || response.statusText || 'Request failed');
    }

    return result;

  } catch (error) {
    toast.error(error.message || 'Network error');
  }
};

export default httpAction;


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
