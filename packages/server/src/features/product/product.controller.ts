import type {
  CreateProduct,
  DeleteProduct,
  GetProduct,
  ListProducts,
  UpdateProduct,
} from './product.controller.interface.js';
import type { IProductController } from './product.controller.interface.js';
import type { ProductService } from './product.service.js';

export class ProductController implements IProductController {
  constructor(private readonly productService: ProductService) {}

  getProduct: GetProduct = async (req, res, next) => {
    try {
      const product = await this.productService.get(req.params.productId);

      return res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  };

  listProducts: ListProducts = async (req, res, next) => {
    try {
      const { products, pagination } = await this.productService.list(req.query);

      return res.json({ success: true, data: { pagination, products } });
    } catch (error) {
      next(error);
    }
  };

  createProduct: CreateProduct = async (req, res, next) => {
    try {
      const data = await this.productService.create({
        ...req.body,
        file: req.file!,
      });

      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  };

  updateProduct: UpdateProduct = async (req, res, next) => {
    try {
      const data = await this.productService.update(req.params.productId, {
        ...req.body,
        file: req.file,
      });
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  };

  deleteProduct: DeleteProduct = async (req, res, next) => {
    try {
      const data = await this.productService.delete(req.params.productId);

      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  };
}
