const Comments = require('../models/Comment');

module.exports = {
    getComments: (req, res) => {
        const getComments = Comments.findAll();

        res.status(200).json(getComments)
    }
};