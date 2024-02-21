export class errhandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}
export const errorhandler = (err, req, res, next) => {
  return res.status(200).json({
    success: false,
    message: err.message,
  });
};

export default errhandler;
