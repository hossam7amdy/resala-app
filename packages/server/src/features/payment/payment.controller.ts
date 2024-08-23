import {
  type GetPaymentResponse,
  RefundPaymentRequest,
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

import { db } from '../../datastore/index.js';
import { BadRequestError } from '../../errors/api.errors.js';
import { authorizeRole } from '../../middlewares/authorization.js';
import { requestValidator } from '../../middlewares/requestValidator.js';
import { PaymentService } from './payment.service.js';
import { PaymobService } from './paymob/paymob.service.js';

@Tags('Payment')
@Route('api/v1/payments')
export class PaymentController extends Controller {
  private readonly paymentService: PaymentService;

  constructor() {
    super();
    this.paymentService = new PaymentService(db, new PaymobService());
  }

  @Get('{transactionId}')
  @Security('jwt_auth')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR'])])
  public async get(@Path() transactionId: string): Promise<GetPaymentResponse> {
    const payment = await this.paymentService.retrieve(+transactionId);

    return { success: true, data: payment };
  }

  @Post('void')
  @Security('jwt_auth')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), requestValidator(VoidPaymentSchema)])
  public async void(@Body() body: VoidPaymentRequest['body']) {
    const transactionId = body.transactionId;

    await this.paymentService.void(transactionId);

    return { success: true };
  }

  @Post('refund')
  @Security('jwt_auth')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), requestValidator(RefundPaymentSchema)])
  public async refund(@Body() body: RefundPaymentRequest['body']) {
    const { transactionId, amount } = body;

    await this.paymentService.refund(transactionId, amount);

    return { success: true };
  }

  /** Webhook for PayMob */
  @Post('post_pay/{orderId}')
  public postPay(
    @Path() orderId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Body() req: any
  ) {
    if (!orderId) {
      throw new BadRequestError('Order ID is required');
    }

    return this.paymentService.postPayCallback(+orderId, req.body);
  }
}
