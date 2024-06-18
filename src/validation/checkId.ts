import mongoose from 'mongoose';

const checkId = (id: string) => {
  return !mongoose.Types.ObjectId.isValid(id);
};

export default checkId;
