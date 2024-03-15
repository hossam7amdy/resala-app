import {
  AdminDeleteUser,
  AdminGetUser,
  AdminGetUsersList,
  AdminUpdateUser,
  GetProfile,
  UpdateProfile,
} from '.';
import { userService } from '../../service';

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
      page: parseInt(page || ''),
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
    const user = await userService.updateUser(userId, req.body);

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
