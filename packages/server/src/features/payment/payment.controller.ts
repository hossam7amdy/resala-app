import {
  type GetPaymentResponse,
  type RefundPaymentRequest,
  RefundPaymentSchema,
  type VoidPaymentRequest,
  VoidPaymentSchema,
} from '@resala/shared';
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Path,
  Post,
  Route,
  Security,
  Tags,
} from 'tsoa/dist/index.js';

import { authorizeRole } from '../../middlewares/authorization.js';
import { validate } from '../../middlewares/validateHandler.js';
import { PaymentService } from './payment.service.js';
import { PaymobService } from './paymob/paymob.service.js';

@Tags('Payment')
@Route('api/v1/payments')
export class PaymentController extends Controller {
  private readonly paymentService: PaymentService;

  constructor() {
    super();
    this.paymentService = new PaymentService(new PaymobService());
  }

  @Get('{transactionId}')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR'])])
  public async get(@Path() transactionId: string): Promise<GetPaymentResponse> {
    const payment = await this.paymentService.retrieve(transactionId);

    return { success: true, data: payment };
  }

  @Post('void')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(VoidPaymentSchema)])
  public async void(@Body() body: VoidPaymentRequest['body']) {
    const transactionId = body.transactionId;

    await this.paymentService.void(transactionId);

    return { success: true };
  }

  @Post('refund')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(RefundPaymentSchema)])
  public async refund(@Body() body: RefundPaymentRequest['body']) {
    const { transactionId, amount } = body;

    await this.paymentService.refund(transactionId, amount);

    return { success: true };
  }
}
