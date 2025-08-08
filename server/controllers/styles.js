import Style from '../models/style.js';

export const listStyles = async (req, res, next) => {
  try {
    const styles = await Style.find({}).sort({ createdAt: -1 });
    res.status(200).json({ status: true, styles });
  } catch (error) {
    next(error);
  }
};

export const getStyle = async (req, res, next) => {
  try {
    const style = await Style.findById(req.params.id);
    if (!style) {
      const err = new Error('Style not found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ status: true, style });
  } catch (error) {
    next(error);
  }
};

export const createStyle = async (req, res, next) => {
  try {
    const { name, description, imageUrl } = req.body;
    const style = await Style.create({ name, description, imageUrl });
    res.status(201).json({ status: true, style });
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const { rating, text } = req.body;
    const style = await Style.findById(req.params.id);
    if (!style) {
      const err = new Error('Style not found');
      err.statusCode = 404;
      throw err;
    }
    style.reviews.push({
      userEmail: req.email,
      userName: req.email?.split('@')[0] || 'User',
      rating: Number(rating),
      text: text || '',
    });
    style.recalculateAverageRating();
    await style.save();
    res.status(200).json({ status: true, style });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;
    const { rating, text } = req.body;
    const style = await Style.findById(id);
    if (!style) {
      const err = new Error('Style not found');
      err.statusCode = 404;
      throw err;
    }
    const review = style.reviews.id(reviewId);
    if (!review) {
      const err = new Error('Review not found');
      err.statusCode = 404;
      throw err;
    }
    if (review.userEmail !== req.email) {
      const err = new Error('Forbidden');
      err.statusCode = 403;
      throw err;
    }
    if (rating !== undefined) review.rating = Number(rating);
    if (text !== undefined) review.text = text;
    style.recalculateAverageRating();
    await style.save();
    res.status(200).json({ status: true, style });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;
    const style = await Style.findById(id);
    if (!style) {
      const err = new Error('Style not found');
      err.statusCode = 404;
      throw err;
    }
    const review = style.reviews.id(reviewId);
    if (!review) {
      const err = new Error('Review not found');
      err.statusCode = 404;
      throw err;
    }
    if (review.userEmail !== req.email) {
      const err = new Error('Forbidden');
      err.statusCode = 403;
      throw err;
    }
    review.deleteOne();
    style.recalculateAverageRating();
    await style.save();
    res.status(200).json({ status: true, style });
  } catch (error) {
    next(error);
  }
};

export const seedStyles = async (req, res, next) => {
  try {
    // Reset and seed fresh every time for demo convenience
    await Style.deleteMany({});
    const styles = await Style.insertMany([
      {
        name: 'Classic pink Hijab',
        description: 'A timeless jet-black hijab crafted in soft, breathable fabric. Works effortlessly for both casual days and formal occasions with a clean, elegant drape.',
        imageUrl: '/heejab1.jpeg',
      },
      {
        name: 'Floral Pastel Hijab',
        description: 'Lightweight chiffon in a pastel base with delicate floral accents. Ideal for spring and summer, giving a gentle, feminine look.',
        imageUrl: '/heejab2.jpeg',
      },
      {
        name: 'Modern Casual Hijab',
        description: 'Everyday comfort with modern styling. Wrinkle-resistant fabric with a matte finish that drapes easily and stays in place throughout the day.',
        imageUrl: '/heejab3.jpeg',
      },
      {
        name: 'Elegant Evening Hijab',
        description: 'Satin-sheen evening hijab designed for dinners and events. Subtle shimmer with a smooth fall for a refined, premium look.',
        imageUrl: '/heejab4.jpeg',
      },
      {
        name: 'Pastel Chic Hijab',
        description: 'Muted pastel tones in airy chiffon. Chic and minimal, perfect for office wear and daytime outings.',
        imageUrl: '/heejab5.jpeg',
      },
      {
        name: 'Bold Pattern Hijab',
        description: 'A statement hijab with bold patterns that instantly lifts minimal outfits. Soft fabric with a crisp edge for easy wrapping.',
        imageUrl: '/heejab6.jpeg',
      },
    ]);
    res.status(201).json({ status: true, styles });
  } catch (error) {
    next(error);
  }
};

export const syncDescriptions = async (req, res, next) => {
  try {
    const canonical = [
      {
        imageUrl: '/heejab1.jpeg',
        name: 'Classic pink Hijab',
        description:
          'A timeless jet-black hijab crafted in soft, breathable fabric. Works effortlessly for both casual days and formal occasions with a clean, elegant drape.',
      },
      {
        imageUrl: '/heejab2.jpeg',
        name: 'Floral Pastel Hijab',
        description:
          'Lightweight chiffon in a pastel base with delicate floral accents. Ideal for spring and summer, giving a gentle, feminine look.',
      },
      {
        imageUrl: '/heejab3.jpeg',
        name: 'Modern Casual Hijab',
        description:
          'Everyday comfort with modern styling. Wrinkle-resistant fabric with a matte finish that drapes easily and stays in place throughout the day.',
      },
      {
        imageUrl: '/heejab4.jpeg',
        name: 'Elegant Evening Hijab',
        description:
          'Satin-sheen evening hijab designed for dinners and events. Subtle shimmer with a smooth fall for a refined, premium look.',
      },
      {
        imageUrl: '/heejab5.jpeg',
        name: 'Pastel Chic Hijab',
        description:
          'Muted pastel tones in airy chiffon. Chic and minimal, perfect for office wear and daytime outings.',
      },
      {
        imageUrl: '/heejab6.jpeg',
        name: 'Bold Pattern Hijab',
        description:
          'A statement hijab with bold patterns that instantly lifts minimal outfits. Soft fabric with a crisp edge for easy wrapping.',
      },
    ];

    const byImageUrl = new Map(canonical.map((c) => [c.imageUrl, c]));
    const styles = await Style.find({});
    await Promise.all(
      styles.map((s) => {
        const ref = byImageUrl.get(s.imageUrl);
        if (!ref) return Promise.resolve();
        let changed = false;
        if (s.name !== ref.name) {
          s.name = ref.name;
          changed = true;
        }
        if (s.description !== ref.description) {
          s.description = ref.description;
          changed = true;
        }
        return changed ? s.save() : Promise.resolve();
      })
    );
    res.status(200).json({ status: true, message: 'Descriptions and names synced' });
  } catch (error) {
    next(error);
  }
};


