import type { UserService } from '../../services/index.js';
import type {
  CreateUserAddress,
  DeleteUser,
  DeleteUserAddress,
  GetUser,
  GetUserAddressList,
  ListUsers,
  UpdateUser,
  UpdateUserAddress,
} from './IUserController.js';
import type IUserController from './IUserController.js';

export default class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  getUser: GetUser = async (req, res, next) => {
    try {
      const user = await this.userService.findUserById(req.params.userId);

      return res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  listUsers: ListUsers = async (req, res, next) => {
    try {
      const { users, pagination } = await this.userService.listUsersPaginated(req.query);

      return res.json({
        success: true,
        data: {
          users,
          pagination,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUser: DeleteUser = async (req, res, next) => {
    try {
      await this.userService.deleteUser(req.params.userId);

      return res.json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  updateUser: UpdateUser = async (req, res, next) => {
    try {
      const user = await this.userService.updateUser(req.params.userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        role: req.body.role,
      });

      return res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserAddressList: GetUserAddressList = async (_, res, next) => {
    const userId = res.locals.user.id;

    try {
      const addresses = await this.userService.getUserAddressList(userId);

      return res.json({
        success: true,
        data: addresses,
      });
    } catch (error) {
      next(error);
    }
  };

  createUserAddress: CreateUserAddress = async (req, res, next) => {
    const userId = res.locals.user.id;

    try {
      const address = await this.userService.createUserAddress(userId, req.body);

      return res.status(201).json({ success: true, data: address });
    } catch (error) {
      next(error);
    }
  };

  updateUserAddress: UpdateUserAddress = async (req, res, next) => {
    const userId = res.locals.user.id;
    const addressId = req.params.addressId;

    try {
      const address = await this.userService.updateUserAddress(userId, addressId, req.body);

      return res.json({
        success: true,
        data: address,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUserAddress: DeleteUserAddress = async (req, res, next) => {
    const userId = res.locals.user.id;
    const addressId = req.params.addressId;

    try {
      const address = await this.userService.deleteUserAddress(userId, addressId);

      return res.json({ success: true, data: address });
    } catch (error) {
      next(error);
    }
  };
}
