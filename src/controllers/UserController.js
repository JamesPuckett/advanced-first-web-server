import UserModel from '../models/UserModel';

const UserController = {
  list: (request, response) => {
    UserModel.find().exec()
      .then((data) => {
        return response.json(data);
      })
      .catch(err => {
        return console.log('Fetching failed', err);
      });
  },
  create: (request, response, next) => {
    const user = new UserModel(request.body);
    user.save()
      .then(storedUser => {
        console.log('User was saved');
        return response.json(storedUser);
      })
      .catch((err) => {
        return next(err);
      });
  },
  find: (request, response, next) => {
    UserModel.findById(request.params._id).exec()
      .then((data) => {
        return response.json(data);
      })
      .catch(err => {
        next(err);
      });
  },
  delete: (request, response) => {
    UserModel.findByIdAndRemove(request.params._id).exec()
      .then((data) => {
        return response.json(data);
      })
      .catch(err => {
        console.log('Error deleting', err);
      });
  }
};

export default UserController;
