import type { PrismaClient } from '@prisma/client';
import type { DefaultFilters, Payment } from '@resala/shared';

export default class PaymentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(payment: Omit<Payment, 'id'>) {
    return await this.prisma.payment.upsert({
      create: payment,
      update: payment,
      where: { orderId: payment.orderId },
    });
  }

  async update(id: number, payment: Partial<Payment>) {
    return await this.prisma.payment.update({
      data: payment,
      where: { id },
    });
  }

  async findById(id: number) {
    return await this.prisma.payment.findUnique({
      where: { id },
    });
  }

  async findByOrderId(orderId: number) {
    return await this.prisma.payment.findFirst({
      where: { orderId },
    });
  }

  async list({ page, limit }: Omit<DefaultFilters, 'query'>) {
    const [total, payments] = await this.prisma.$transaction([
      this.prisma.payment.count(),
      this.prisma.payment.findMany({
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { total, payments };
  }
}
