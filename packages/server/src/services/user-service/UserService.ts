import type {
  AdminUpdateUserRequest,
  CreateAddressRequest,
  DefaultFilters,
  UpdateAddressRequest,
} from '@resala/shared';

import type { UserRepository } from '../../repositories/index.js';
import { ConflictError, NotFoundError } from '../../utils/ApiErrors.js';

export default class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async updateUser(id: number, payload: Partial<AdminUpdateUserRequest['body']>) {
    await this.findUserById(id);

    const duplicate = payload.phone && (await this.userRepo.findByPhone(payload.phone));
    if (duplicate && duplicate.id !== id) {
      throw new ConflictError('User with this phone already exists!');
    }

    const user = await this.userRepo.update(id, payload);
    return user;
  }

  async deleteUser(id: number) {
    await this.findUserById(id);
    await this.userRepo.delete(id);

    return true;
  }

  async findUserById(id: number) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async listUsersPaginated(filters: DefaultFilters) {
    const { page, limit, query } = filters;
    const { total, users } = await this.userRepo.list({ page, limit, query });

    return {
      users,
      pagination: { page, limit, total },
    };
  }

  async getUserAddressList(userId: number) {
    return await this.userRepo.address.list(userId);
  }

  async createUserAddress(userId: number, payload: CreateAddressRequest['body']) {
    const address = {
      phone: payload.phone,
      firstName: payload.firstName,
      lastName: payload.lastName,
      state: payload.state,
      city: payload.city,
      street: payload.street,
      country: 'Egypt',
      building: payload.building || null,
      floor: payload.floor || null,
      address: payload.address || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.userRepo.address.create(userId, address);
  }

  async findUserAddress(userId: number, addressId: number) {
    const address = await this.userRepo.address.find(userId, addressId);

    if (!address) {
      throw new NotFoundError('Address not found');
    }

    return address;
  }

  async updateUserAddress(
    userId: number,
    addressId: number,
    payload: UpdateAddressRequest['body']
  ) {
    await this.findUserAddress(userId, addressId);

    const address = await this.userRepo.address.update(addressId, {
      phone: payload.phone,
      firstName: payload.firstName,
      lastName: payload.lastName,
      state: payload.state,
      city: payload.city,
      street: payload.street,
      country: 'Egypt',
      building: payload.building || null,
      floor: payload.floor || null,
      address: payload.address || null,
      updatedAt: new Date(),
    });

    return address;
  }

  async deleteUserAddress(userId: number, addressId: number) {
    await this.findUserAddress(userId, addressId);

    return await this.userRepo.address.delete(addressId);
  }
}
