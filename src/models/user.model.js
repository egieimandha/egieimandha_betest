const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    emailAddress: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    identityNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (emailAddress) {
  const user = await this.findOne({ emailAddress });
  return !!user;
};

userSchema.statics.isUserNameTaken = async function (userName) {
  const user = await this.findOne({ userName });
  return !!user;
};

userSchema.statics.isDuplicateIdentitiyNumber = async function (identityNumber) {
  const user = await this.findOne({ identityNumber });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
