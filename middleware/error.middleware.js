

const errorHandler=((err, req, res, next) => {
    res.status(400).json({ error: 'Something went wrong!' });
  });

  module.exports = errorHandler