import type { InventoryService } from '../../services/index.js';
import type {
  CreateProduct,
  DeleteProduct,
  GetProduct,
  GetProductsList,
  ListProductStocks,
  UpdateProduct,
} from './IProductController.js';
import type IProductController from './IProductController.js';

export default class ProductController implements IProductController {
  constructor(private readonly inventoryService: InventoryService) {}

  getProduct: GetProduct = async (req, res, next) => {
    try {
      const product = await this.inventoryService.product.findProductById(req.params.productId);

      return res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  };

  getProductsList: GetProductsList = async (req, res, next) => {
    try {
      const { products, pagination } = await this.inventoryService.product.listProductsPaginated(
        req.query
      );

      return res.json({ success: true, data: { pagination, products } });
    } catch (error) {
      next(error);
    }
  };

  createProduct: CreateProduct = async (req, res, next) => {
    try {
      await this.inventoryService.category.findCategoryById(req.body.categoryId);

      const data = await this.inventoryService.product.createProduct({
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
      const data = await this.inventoryService.product.updateProduct(req.params.productId, {
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
      const data = await this.inventoryService.product.deleteProduct(req.params.productId);

      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  };

  listProductStocks: ListProductStocks = async (req, res, next) => {
    try {
      const stocks = await this.inventoryService.stock.getByProduct(req.params.productId);

      return res.json({ success: true, data: stocks });
    } catch (error) {
      next(error);
    }
  };
}
