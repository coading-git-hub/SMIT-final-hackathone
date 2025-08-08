import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, Divider, Rating, TextField, Button, Stack, Container } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import useGeneral from '../hooks/useGeneral';
import httpAction from '../utils/httpAction';
import apis from '../utils/apis';

const StyleDetail = () => {
  const { id } = useParams();
  const { navigate } = useGeneral();
  const [style, setStyle] = useState(null);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = { url: apis().getStyle(id) };
      const result = await httpAction(data);
      if (result?.status) setStyle(result.style);
    };
    const checkAuth = async () => {
      const data = { url: apis().getAccess };
      const r = await httpAction(data);
      setIsAuth(Boolean(r?.status));
    };
    load(); // re-fetches from server; httpAction uses no-cache
    checkAuth();
  }, [id]);

  const submitReview = async () => {
    const data = { url: apis().addReview(id), method: 'POST', body: { rating, text } };
    const result = await httpAction(data);
    if (result?.status) {
      setRating(0);
      setText('');
      setStyle(result.style);
      navigate('/');
    }
  };

  if (!style) return null;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')}>Back to Home</Button>
      </Box>
      <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={style.imageUrl}
          alt={style.name}
          sx={{ height: { xs: 280, sm: 380 }, objectFit: 'cover', width: '100%' }}
        />
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{style.name}</Typography>
          <Typography variant="body1" sx={{ mb: 1, whiteSpace: 'pre-line' }}>{style.description}</Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Rating value={Number(style.averageRating || 0)} precision={0.1} readOnly />
            <Typography variant="caption">{style.averageRating}</Typography>
            <Typography variant="caption">({style.reviews?.length || 0} reviews)</Typography>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Add a Review</Typography>
          {isAuth ? (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
              <Rating value={rating} onChange={(_, v) => setRating(v)} />
              <TextField value={text} onChange={(e) => setText(e.target.value)} placeholder="Write something..." size="small" fullWidth />
              <Button variant="contained" onClick={submitReview} disabled={!rating}>Submit</Button>
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">Please login to add a review.</Typography>
          )}
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Reviews</Typography>
          <Stack spacing={1}>
            {style.reviews?.slice().reverse().map((r) => (
              <Box key={r._id} sx={{ p: 1.5, borderRadius: 1, bgcolor: '#fafafa', border: '1px solid #eee' }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating value={r.rating} readOnly size="small" />
                  <Typography variant="caption">{r.userName}</Typography>
                  <Typography variant="caption" color="text.secondary">{new Date(r.createdAt).toLocaleString()}</Typography>
                </Stack>
                {r.text && <Typography variant="body2" sx={{ mt: 0.5 }}>{r.text}</Typography>}
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StyleDetail;


