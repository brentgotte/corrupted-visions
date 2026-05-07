import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY
);


// Get profile based on UUID
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;

  // Get profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }

  // Get role
  let roleData = null;
  const roleTable = profile.role_type === 'student' ? 'student_profiles'
                  : profile.role_type === 'professor' ? 'professor_profiles'
                  : null;

  if (roleTable) {
    const { data } = await supabase
      .from(roleTable)
      .select('*')
      .eq('profile_id', id)
      .single();
    roleData = data;
  }

  // Get reviews and tags from that review
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('profile_id', id);

  const reviewsWithTags = await Promise.all(
    (reviews || []).map(async (review) => {
      const { data: tags } = await supabase
        .from('review_tags')
        .select('tags (name)')
        .eq('review_id', review.id);

      return {
        ...review,
        tags: tags?.map(t => t.tags.name) ?? []
      };
    })
  );

  // Make sure there are no duplicate tags
  const uniqueTags = [...new Set(reviewsWithTags.flatMap(r => r.tags))];

  return res.json({
    success: true,
    data: {
      id:              profile.id,
      name:            profile.name,
      role:            profile.role_type,
      institution:     profile.institution,
      matchConfidence: profile.match_confidence,
      ...roleData,
      reviews:         reviewsWithTags,
      labels:          uniqueTags
      }
  });
});

// Post new review
router.post('/review', async (req, res) => {
  const { profile_id, overall_rating, secondary_rating, comment, tags = [] } = req.body;

  // Validation
  const errors = [];

  if (!profile_id || typeof profile_id !== 'string' || profile_id.trim() === '') {
    errors.push('profile_id is required and must be a valid UUID string.');
  }

  if (overall_rating === undefined || overall_rating === null) {
    errors.push('overall_rating is required.');
  } else if (typeof overall_rating !== 'number' || overall_rating < 1 || overall_rating > 5) {
    errors.push('overall_rating must be a number between 1 and 5.');
  }

  if (secondary_rating === undefined || secondary_rating === null) {
    errors.push('secondary_rating is required.');
  } else if (typeof secondary_rating !== 'number' || secondary_rating < 1 || secondary_rating > 5) {
    errors.push('secondary_rating must be a number between 1 and 5.');
  }

  if (!Array.isArray(tags)) {
    errors.push('tags must be an array.');
  } else if (tags.some(tag => typeof tag !== 'string' || tag.trim() === '')) {
    errors.push('Each tag must be a non empty string.');
  }

  if (typeof comment !== 'string' || comment.trim() === '') {
    errors.push('comment is required and must be a non empty string.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the errors and try again.',
      errors
    });
  }

  // Insert review
  const { data: review, error } = await supabase
    .from('reviews')
    .insert([{ profile_id, overall_rating, secondary_rating, comment }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }

  // Link tags to the review
  if (tags.length > 0) {
    const { data: tagRows } = await supabase
      .from('tags')
      .select('id, name')
      .in('name', tags);

    const inserts = tagRows.map(tag => ({ review_id: review.id, tag_id: tag.id }));
    await supabase.from('review_tags').insert(inserts);
  }

  return res.json({ success: true, message: 'Review created', data: review });
});

export default router;