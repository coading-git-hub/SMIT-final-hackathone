

const apis =()=>{
    const local= process.env.REACT_APP_API_BASE || "http://localhost:5000/";

const list = {
    registerUser: `${local}user/register`,
    loginUser: `${local}user/login`,
    userProfile:`${local}user/profile`,
    logout: `${local}user/logout`,
    getAccess: `${local}user/access`,
    listStyles: `${local}styles/`,
    seedStyles: `${local}styles/seed`,
    getStyle: (id) => `${local}styles/${id}`,
    addReview: (id) => `${local}styles/${id}/reviews`,
    updateReview: (id, reviewId) => `${local}styles/${id}/reviews/${reviewId}`,
    deleteReview: (id, reviewId) => `${local}styles/${id}/reviews/${reviewId}`,
};
return list;
}
export default apis;