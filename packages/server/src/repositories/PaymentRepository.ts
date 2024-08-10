import type { PrismaClient } from '@prisma/client';
import type { DefaultFilters, Payment } from '@resala/shared';

export default class PaymentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(payment: Payment) {
    return await this.prisma.payment.upsert({
      create: payment,
      update: payment,
      where: { orderId: payment.orderId },
    });
  }

  async update(orderId: number, payment: Partial<Payment>) {
    return await this.prisma.payment.update({
      data: payment,
      where: { orderId },
    });
  }

  async findByOrderId(orderId: number) {
    return await this.prisma.payment.findFirst({
      where: { orderId },
    });
  }

  async findByTransactionId(transactionId: number) {
    return await this.prisma.payment.findFirst({
      where: { transactionId },
    });
  }

  async list({ page, limit }: Omit<DefaultFilters, 'query'>) {
    const [total, payments] = await this.prisma.$transaction([
      this.prisma.payment.count(),
      this.prisma.payment.findMany({
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { orderId: 'desc' },
      }),
    ]);

    return { total, payments };
  }
}
