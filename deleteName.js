const express = require('express');
const router = express.Router();
const Practice = require('./practiceModel');

router.use(express.json());
router.delete('/practices/:id', async (req, res) => {
console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
  try {
    const deletedPractice = await Practice.findByIdAndDelete(req.params.id);
    if (!deletedPractice) {
      return res.status(404).json({ error: 'Practice not found' });
    }
    res.json({ message: 'Practice deleted successfully' });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: 'Failed to delete practice' });
  }
});
module.exports = router;