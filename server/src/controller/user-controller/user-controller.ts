import { userService } from '../../services';
import {
  AdminDeleteUser,
  AdminGetUser,
  AdminGetUsersList,
  AdminUpdateUser,
  CreateUserAddress,
  GetProfile,
  GetUserAddressList,
  UpdateProfile,
  UpdateUserAddress,
} from '../../types';

export const getProfile: GetProfile = async (_, res, next) => {
  const userId = res.locals.user.id;
  try {
    const user = await userService.findUserById(userId);

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile: UpdateProfile = async (req, res, next) => {
  const userId = res.locals.user.id;
  const { firstName, lastName, phone } = req.body;

  try {
    const user = await userService.updateUser(userId, {
      firstName,
      lastName,
      phone,
    });

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const adminGetUser: AdminGetUser = async (req, res, next) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await userService.findUserById(userId);

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const adminGetUsersList: AdminGetUsersList = async (req, res, next) => {
  const PAGE_SIZE = 10;
  const { page, query } = req.query;

  try {
    const { users, pagination } = await userService.listUsersPaginated({
      page: parseInt(page || '1'),
      query: query || '',
      limit: PAGE_SIZE,
    });

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

export const adminDeleteUser: AdminDeleteUser = async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  try {
    await userService.deleteUser(userId);

    return res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const adminUpdateUser: AdminUpdateUser = async (req, res, next) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await userService.updateUser(userId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      phone: req.body.phone,
    });

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserAddressList: GetUserAddressList = async (_, res, next) => {
  const userId = res.locals.user.id;

  try {
    const addresses = await userService.getUserAddressList(userId);

    return res.json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserAddress: CreateUserAddress = async (req, res, next) => {
  const userId = res.locals.user.id;

  try {
    const address = await userService.createUserAddress(userId, req.body);

    return res.status(201).json({
      success: true,
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserAddress: UpdateUserAddress = async (req, res, next) => {
  const userId = res.locals.user.id;
  const addressId = parseInt(req.params.addressId);

  try {
    const address = await userService.updateUserAddress(userId, addressId, req.body);

    return res.json({
      success: true,
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserAddress: UpdateUserAddress = async (req, res, next) => {
  const userId = res.locals.user.id;
  const addressId = parseInt(req.params.addressId);

  try {
    await userService.deleteUserAddress(userId, addressId);

    return res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
