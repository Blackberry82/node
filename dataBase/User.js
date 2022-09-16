const {Schema, model} = require('mongoose');
const tokenService = require('../services/token.service');

const userSchema = new Schema({
  name: {type: String, trim: true, required: true},
  age: {type: Number, default: 18},
  email: {type: String, trim: true, lowercase: true, required: true},
  password: {type: String, required: true},
  avatar: {type: String, default: ''},
  cars: {type: [Schema.Types.ObjectId], ref: 'car', select: false}
}, {
  timestamps: true,
  versionKey: false
});

userSchema.statics = {
  testStatic() {
    console.log('THIS IS STATIC-------------------');
    console.log(this);
    console.log('THIS IS STATIC-------------------');
  },
  async createUserWithHashPassword(userObject = {}){
    const hashPassword = await tokenService.hashPassword(userObject.password);

    return this.create({...userObject, password: hashPassword});
  }
};

userSchema.methods = {
  testMethod() {
    console.log('THIS IS METHOD-------------------');
    console.log(this);
    console.log('THIS IS METHOD-------------------');
  },

  async checkIsPasswordSame(password){
    await tokenService.comparePassword(password, this.password);
  }
};

module.exports = model('user', userSchema);
