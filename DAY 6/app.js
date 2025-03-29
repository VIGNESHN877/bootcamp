app.get('/data', (req, res, next) => {
  const { id } = req.query;
  if (!id) {
      // Creating an error object and passing it to the next middleware
      const error = new Error('ID parameter is required');
      error.status = 400; // Bad Request
      return next(error);
  }
  res.json({ message: 'Data received', id });
});