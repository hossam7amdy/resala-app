import type { CreateAddressRequest, UpdateAddressRequest } from '@resala/shared';

export type { Address } from '@prisma/client';

type CreateAddressDto = CreateAddressRequest['body'] & {
  userId: string;
};

type UpdateAddressDto = UpdateAddressRequest['body'] & {
  userId: string;
};

type FindAddressParamsDto = {
  userId: string;
};

type DeleteAddressParamsDto = FindAddressParamsDto;

export type { CreateAddressDto, UpdateAddressDto, FindAddressParamsDto, DeleteAddressParamsDto };
