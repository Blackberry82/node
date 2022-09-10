const {PreviousPass} = require('../dataBase');

module.exports = {
  savePasswordInfo: (oldPassInfo) => {
    return PreviousPass.create(oldPassInfo);
  },

  getByUserId: (userId) => {
    return PreviousPass.find({user: userId}).lean();
  },

  deleteManyBeforeDate: (date) => {
    return PreviousPass.deleteMany({createdAt: {$lt: date}});
  },
};
