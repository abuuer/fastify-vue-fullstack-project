import { FastifyReply, FastifyRequest } from "fastify";
import {
  createProduct,
  deleteProductById,
  getProducts,
  updateProductById,
} from "./product.service";
import { updateProductSchema, reqProductSchema } from "./product.schema";
import { uploadImage, deleteImage } from "../../utils/imageUpload";

const createProductController = async (
  req: FastifyRequest<{
    Body: reqProductSchema;
  }>,
  rep: FastifyReply
) => {
  const { fileBuffer, fileName, name, category_id } = req.body;
  try {
    const fullPath = await uploadImage(fileBuffer, fileName);
    const product = await createProduct({
      name,
      category_id: parseInt(category_id),
      picture: fullPath,
    });
    return rep.code(200).send({
      success: true,
      message: "Product created successfully",
      product: product,
    });
  } catch (error) {
    return rep.code(400).send(error);
  }
};

const getProductsController = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  try {
    const products = await getProducts();
    return rep.code(200).send({
      success: true,
      products: products,
    });
  } catch (error) {
    return rep.code(400).send(error);
  }
};

const updateProductController = async (
  req: FastifyRequest<{ Params: { id: string }; Body: updateProductSchema }>,
  rep: FastifyReply
) => {
  const { fileBuffer, fileName, name, oldPictureName } = req.body;
  let picture = undefined;
  if (fileBuffer && fileName && oldPictureName) {
    picture = await uploadImage(fileBuffer, fileName);
    await deleteImage(oldPictureName);
  }

  try {
    const { id } = req.params;
    const data = req.body;
    const product = await updateProductById(parseInt(id), {
      name,
      picture,
    });
    console.log(req.body);

    return rep.code(200).send({
      success: true,
      message: "Product updated successfully",
      product: product,
    });
  } catch (error) {
    return rep.code(400).send(error);
  }
};

const deleteProductController = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  rep: FastifyReply
) => {
  try {
    const { id } = req.params;
    const product = await deleteProductById(parseInt(id));
    return rep.code(200).send({
      success: true,
      message: "Category deleted successfully",
      product: product,
    });
  } catch (error) {
    return rep.code(400).send(error);
  }
};

export {
  createProductController,
  getProductsController,
  updateProductController,
  deleteProductController,
};
