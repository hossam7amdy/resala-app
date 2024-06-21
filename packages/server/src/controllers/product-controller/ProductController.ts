import type { FileService, InventoryService } from '../../services/index.js';
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
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly fileService: FileService
  ) {}

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
      const { key, url } = await this.fileService.uploadFile(req.file!);

      const data = await this.inventoryService.product.createProduct({
        ...req.body,
        imageKey: key,
        imageUrl: url,
      });

      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  };

  updateProduct: UpdateProduct = async (req, res, next) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let product: any = req.body;

      if (req.file) {
        const { key, url } = await this.fileService.uploadFile(req.file);
        product = { ...product, imageKey: key, imageUrl: url };
      }

      const data = await this.inventoryService.product.updateProduct(req.params.productId, product);
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  };

  deleteProduct: DeleteProduct = async (req, res, next) => {
    try {
      const product = await this.inventoryService.product.findProductById(req.params.productId);

      const [data] = await Promise.all([
        this.inventoryService.product.deleteProduct(req.params.productId),
        this.fileService.deleteFile(product.imageKey),
      ]);

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
