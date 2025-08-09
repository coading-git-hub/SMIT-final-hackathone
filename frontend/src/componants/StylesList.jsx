import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Rating, Box, CircularProgress, Stack, Container, Chip } from '@mui/material';
import useGeneral from '../hooks/useGeneral';
import hijabStyles from '../data/hijaabStyle';

const StylesList = () => {
  const { navigate } = useGeneral();
  const [loading, setLoading] = useState(true);
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setStyles(hijabStyles);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          mb: 1,
          fontWeight: 900,
          background: 'linear-gradient(90deg,#111,#6a5acd,#e91e63)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Hijab Styles Gallery
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 5 }}>
        Discover styles and read community reviews.
      </Typography>
      {loading && (
        <Stack direction="row" justifyContent="center" sx={{ py: 4 }}>
          <CircularProgress size={28} />
        </Stack>
      )}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
        {!loading && styles.length === 0 && (
          <Box sx={{ p: 2, color: 'text.secondary' }}>No styles available.</Box>
        )}
        {styles.map((s) => (
          <Box key={s._id} sx={{ display: 'flex' }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                transition: 'transform .25s ease, box-shadow .25s ease',
                '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 24px 50px rgba(0,0,0,0.16)' },
                cursor: 'pointer',
                width: '100%'
              }}
              onClick={() => navigate(`/styles/${s._id}`)}
            >
              <CardMedia
                component="img"
                image={s.imageUrl}
                alt={s.name}
                sx={{ height: 220, objectFit: 'cover', width: '100%', transition: 'transform .3s', '&:hover': { transform: 'scale(1.02)' } }}
              />
              <CardContent sx={{ flexGrow: 1, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{s.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{s.description}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
                  <Rating value={Number(s.averageRating || 0)} precision={0.1} readOnly size="small" />
                  <Chip size="small" label={`${s.reviews?.length || 0} reviews`} variant="outlined" />
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                <Button variant="contained" fullWidth onClick={() => navigate(`/styles/${s._id}`)}>View</Button>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default StylesList;
