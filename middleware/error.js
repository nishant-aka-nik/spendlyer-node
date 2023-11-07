// middleware/error.js

// Error handling middleware function
const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging
  
    // Customize the error response based on the error type
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  export default errorHandler;
  