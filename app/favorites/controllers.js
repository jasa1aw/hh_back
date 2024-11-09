// controllers/favoritesController.js
const Favorites = require('./Favorite');
const User = require('../auth/User')

// Add to favorites
const addFavorite = async (req, res) => {
  try {
    const { userId, resumeId, vacancyId } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Enforce role-based restrictions
    if (user.roleId === 1 && !vacancyId) {
      return res.status(400).json({ error: 'Employers can only favorite vacancies.' });
    }
    if (user.roleId === 2 && !resumeId) {
      return res.status(400).json({ error: 'Managers can only favorite resumes.' });
    }

    // Check for mutually exclusive fields
    if (resumeId && vacancyId) {
      return res.status(400).json({ error: 'Only one of resumeId or vacancyId can be provided.' });
    }

    const favorite = await Favorites.create({ userId, resumeId, vacancyId });
    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding to favorites.' });
  }
};


// Get all favorites for a user
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorites.findAll({
      where: { userId: req.params.id },
    });
    res.status(200).send(favorites);
  } catch (error) {
	console.error(error)
    res.status(500).json({ error: 'Error fetching favorites.' });
  }
};

// Remove from favorites
const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Favorites.destroy({ where: { id } });

    if (result === 0) return res.status(404).json({ error: 'Favorite not found.' });
    res.status(200).json({ message: 'Favorite removed successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing favorite.' });
  }
};
module.exports = {
	addFavorite, getFavorites, removeFavorite
};