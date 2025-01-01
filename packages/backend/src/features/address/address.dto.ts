import type {
  CreateAddressRequest,
  GetAddressResponse,
  ListAddressResponse,
  UpdateAddressRequest,
} from '@resala/shared';

export type { Address } from '@prisma/client';

type GetAddressResponseDto = GetAddressResponse['data'];

type ListAddressResponseDto = ListAddressResponse['data'];

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

export type {
  CreateAddressDto,
  UpdateAddressDto,
  FindAddressParamsDto,
  DeleteAddressParamsDto,
  GetAddressResponseDto,
  ListAddressResponseDto,
};
