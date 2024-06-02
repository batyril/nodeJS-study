import mongoose from 'mongoose';

const checkId = (id) => {
  return !mongoose.Types.ObjectId.isValid(id);
};

export default checkId;
