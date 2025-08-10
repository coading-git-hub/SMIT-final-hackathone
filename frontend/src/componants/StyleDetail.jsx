// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Box, Typography, Card, CardMedia, CardContent, Divider,
//   Rating, Button, Stack, Container, Grid, TextField
// } from '@mui/material';
// import { ArrowBack } from '@mui/icons-material';
// import useGeneral from '../hooks/useGeneral';
// import hijabStyles from '../data/hijaabStyle';

// const StyleDetail = () => {
//   const { id } = useParams();
//   const { navigate } = useGeneral();
//   const [style, setStyle] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [text, setText] = useState('');
//   const [userName] = useState('Guest');

//   useEffect(() => {
//     const found = hijabStyles.find((s) => s._id === id);
//     if (!found) return;

//     const savedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`)) || found.reviews || [];
//     setStyle({ ...found, reviews: savedReviews });
//   }, [id]);

//   const submitReview = () => {
//     if (!rating || !text.trim()) return;

//     const newReview = {
//       userName,
//       rating,
//       text,
//       createdAt: new Date().toISOString()
//     };

//     const updatedReviews = [...style.reviews, newReview];
//     setStyle({ ...style, reviews: updatedReviews });
//     localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

//     setRating(0);
//     setText('');
//   };

//   const deleteReview = (index) => {
//     const updatedReviews = style.reviews.filter((_, i) => i !== index);
//     setStyle({ ...style, reviews: updatedReviews });
//     localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
//   };

//   if (!style) {
//     return (
//       <Container maxWidth="md" sx={{ py: 6 }}>
//         <Typography variant="h6" color="error">Style not found.</Typography>
//         <Button startIcon={<ArrowBack />} onClick={() => navigate('/')}>Back to Home</Button>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md" sx={{ py: 6 }}>
//       <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
//         Back to Home
//       </Button>
//       <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' }}>
//         <Grid container>
//           {/* Left Side Image */}
//           <Grid item xs={12} md={5}>
//             <CardMedia
//               component="img"
//               image={style.imageUrl}
//               alt={style.name}
//               sx={{ height: '100%', objectFit: 'cover', minHeight: 300, width:'100%' }}
//             />
//           </Grid>

//           {/* Right Side Details */}
//           <Grid item xs={12} md={7}>
//             <CardContent>
//               <Typography
//                 variant="h4"
//                 sx={{
//                   fontWeight: 900,
//                   background: 'linear-gradient(90deg, #6a5acd, #e91e63)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   mb: 1
//                 }}
//               >
//                 {style.name}
//               </Typography>
//               <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//                 {style.description}
//               </Typography>

//               <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
//                 <Rating
//                   value={
//                     style.reviews.length
//                       ? style.reviews.reduce((acc, r) => acc + r.rating, 0) / style.reviews.length
//                       : 0
//                   }
//                   precision={0.1}
//                   readOnly
//                 />
//                 <Typography variant="caption">
//                   ({style.reviews.length} reviews)
//                 </Typography>
//               </Stack>

//               <Divider sx={{ mb: 2 }} />

//               {/* Add Review */}
//               <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Add a Review</Typography>
//               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} sx={{ mb: 2 }}>
//                 <Rating value={rating} onChange={(_, v) => setRating(v)} />
//                 <TextField
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   placeholder="Write your review..."
//                   size="small"
//                   fullWidth
//                 />
//                 <Button variant="contained" onClick={submitReview} disabled={!rating || !text.trim()}>
//                   Submit
//                 </Button>
//               </Stack>

//               <Divider sx={{ mb: 2 }} />

//               {/* Show Reviews */}
//               <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Reviews</Typography>
//               <Stack spacing={1}>
//                 {style.reviews.length > 0 ? (
//                   style.reviews.map((r, index) => (
//                     <Box key={index} sx={{ p: 1.5, borderRadius: 1, bgcolor: '#fafafa', border: '1px solid #eee' }}>
//                       <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
//                         <Stack direction="row" alignItems="center" spacing={1}>
//                           <Rating value={r.rating} readOnly size="small" />
//                           <Typography variant="caption">{r.userName}</Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {new Date(r.createdAt).toLocaleString()}
//                           </Typography>
//                         </Stack>
//                         <Button size="small" color="error" onClick={() => deleteReview(index)}>Delete</Button>
//                         {/* <Button size="small" color="error" onClick={() => updatedReviews()}>update</Button> */}

//                       </Stack>
//                       {r.text && <Typography variant="body2" sx={{ mt: 0.5 }}>{r.text}</Typography>}
//                     </Box>
//                   ))
//                 ) : (
//                   <Typography variant="body2" color="text.secondary">No reviews yet.</Typography>
//                 )}
//               </Stack>
//             </CardContent>
//           </Grid>
//         </Grid>
//       </Card>
//     </Container>
//   );
// };

// export default StyleDetail;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, Card, CardMedia, CardContent, Divider,
  Rating, Button, Stack, Container, Grid, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import useGeneral from '../hooks/useGeneral';
import hijabStyles from '../data/hijaabStyle';

const StyleDetail = () => {
  const { id } = useParams();
  const { navigate } = useGeneral();
  const [style, setStyle] = useState(null);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [userName] = useState('Guest'); // yahan ap apna auth user ka naam la sakte ho

  // For edit modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(0);

  useEffect(() => {
    const found = hijabStyles.find((s) => s._id === id);
    if (!found) return;

    const savedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`)) || found.reviews || [];
    setStyle({ ...found, reviews: savedReviews });
  }, [id]);

  const submitReview = () => {
    if (!rating || !text.trim()) return;

    const newReview = {
      userName,
      rating,
      text,
      createdAt: new Date().toISOString()
    };

    const updatedReviews = [...style.reviews, newReview];
    setStyle({ ...style, reviews: updatedReviews });
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

    setRating(0);
    setText('');
  };

  const deleteReview = (index) => {
    const updatedReviews = style.reviews.filter((_, i) => i !== index);
    setStyle({ ...style, reviews: updatedReviews });
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
  };

  // Open update modal
  const openEditModal = (index) => {
    const review = style.reviews[index];
    setEditIndex(index);
    setEditText(review.text);
    setEditRating(review.rating);
    setIsEditOpen(true);
  };

  // Save updated review
  const saveUpdatedReview = () => {
    const updatedReviews = [...style.reviews];
    updatedReviews[editIndex] = {
      ...updatedReviews[editIndex],
      text: editText,
      rating: editRating,
      updatedAt: new Date().toISOString()
    };
    setStyle({ ...style, reviews: updatedReviews });
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setIsEditOpen(false);
  };

  if (!style) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h6" color="error">Style not found.</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')}>Back to Home</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
        Back to Home
      </Button>
      <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' }}>
        <Grid container>
          {/* Left Side Image */}
          <Grid item xs={12} md={5}>
            <CardMedia
              component="img"
              image={style.imageUrl}
              alt={style.name}
              sx={{ height: '100%', objectFit: 'cover', minHeight: 300, width: '100%' }}
            />
          </Grid>

          {/* Right Side Details */}
          <Grid item xs={12} md={7}>
            <CardContent>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  background: 'linear-gradient(90deg, #6a5acd, #e91e63)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}
              >
                {style.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {style.description}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Rating
                  value={
                    style.reviews.length
                      ? style.reviews.reduce((acc, r) => acc + r.rating, 0) / style.reviews.length
                      : 0
                  }
                  precision={0.1}
                  readOnly
                />
                <Typography variant="caption">
                  ({style.reviews.length} reviews)
                </Typography>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              {/* Add Review */}
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Add a Review</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} sx={{ mb: 2 }}>
                <Rating value={rating} onChange={(_, v) => setRating(v)} />
                <TextField
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your review..."
                  size="small"
                  fullWidth
                />
                <Button variant="contained" onClick={submitReview} disabled={!rating || !text.trim()}>
                  Submit
                </Button>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              {/* Show Reviews */}
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Reviews</Typography>
              <Stack spacing={1}>
                {style.reviews.length > 0 ? (
                  style.reviews.map((r, index) => (
                    <Box key={index} sx={{ p: 1.5, borderRadius: 1, bgcolor: '#fafafa', border: '1px solid #eee' }}>
                      <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Rating value={r.rating} readOnly size="small" />
                          <Typography variant="caption">{r.userName}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(r.createdAt).toLocaleString()}
                          </Typography>
                        </Stack>
                        {r.userName === userName && (
                          <Stack direction="row" spacing={1}>
                            <Button size="small" color="primary" onClick={() => openEditModal(index)}>Update</Button>
                            <Button size="small" color="error" onClick={() => deleteReview(index)}>Delete</Button>
                          </Stack>
                        )}
                      </Stack>
                      {r.text && <Typography variant="body2" sx={{ mt: 0.5 }}>{r.text}</Typography>}
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">No reviews yet.</Typography>
                )}
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

     {/* Edit Modal */}
<Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
  <DialogTitle>Update Your Review</DialogTitle>
  <DialogContent sx={{ mt: 1 }}>
    <Typography variant="subtitle2" sx={{ mb: 1 }}>Update Rating:</Typography>
    <Rating
      value={editRating}
      onChange={(_, v) => setEditRating(v)}
      size="large"
    />

    <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Update Review:</Typography>
    <TextField
      fullWidth
      multiline
      minRows={3}
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      placeholder="Write your updated review..."
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
    <Button
      onClick={saveUpdatedReview}
      variant="contained"
      disabled={!editRating || !editText.trim()}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

    </Container>
  );
};

export default StyleDetail;
