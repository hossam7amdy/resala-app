import type {
  CreateUserAddress,
  DeleteUser,
  DeleteUserAddress,
  GetUser,
  ListUserAddress,
  ListUsers,
  UpdateUser,
  UpdateUserAddress,
} from './user.controller.interface.js';
import type { IUserController } from './user.controller.interface.js';
import type { UserService } from './user.service.js';

export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  getUser: GetUser = async (req, res, next) => {
    try {
      const user = await this.userService.find(req.params.userId);

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
      const { users, pagination } = await this.userService.list(req.query);

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
      await this.userService.delete(req.params.userId);

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
      const user = await this.userService.update(req.params.userId, req.body);

      return res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  listUserAddress: ListUserAddress = async (req, res, next) => {
    const userId = req.query.userId;

    try {
      const addresses = await this.userService.listAddress(userId);

      return res.json({
        success: true,
        data: addresses,
      });
    } catch (error) {
      next(error);
    }
  };

  createUserAddress: CreateUserAddress = async (req, res, next) => {
    try {
      const address = await this.userService.createAddress(req.body);

      return res.status(201).json({ success: true, data: address });
    } catch (error) {
      next(error);
    }
  };

  updateUserAddress: UpdateUserAddress = async (req, res, next) => {
    const addressId = req.params.addressId;

    try {
      const address = await this.userService.updateAddress(addressId, req.body);

      return res.json({
        success: true,
        data: address,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUserAddress: DeleteUserAddress = async (req, res, next) => {
    const addressId = req.params.addressId;

    try {
      const address = await this.userService.deleteAddress(addressId);

      return res.json({ success: true, data: address });
    } catch (error) {
      next(error);
    }
  };
}
