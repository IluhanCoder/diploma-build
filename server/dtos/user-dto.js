module.exports = class UserDto {
  login;
  email;
  birthday;
  cell;
  city;
  gender;
  avatar;
  id;
  isActivated;
  eventInvites;
  eventPropositions;

  constructor(model) {
    this.login = model.login;
    this.email = model.email;
    this.birthday = model.birthday;
    this.cell = model.cell;
    this.city = model.city;
    this.gender = model.gender;
    this.avatar = model.avatar;
    this._id = model._id;
    this.isActivated = model.isActivated;
    this.eventInvites = model.eventInvites;
    this.eventPropositions = model.eventPropositions;
  }
};
