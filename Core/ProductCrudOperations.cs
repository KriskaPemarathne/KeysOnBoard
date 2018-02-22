using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class ProductCrudOperations
    {
        private readonly KeysOnBoardingEntities db;
        public ProductCrudOperations()
        {
            db = new KeysOnBoardingEntities();
        }

        public List<Core.Models.Product> GetAllProducts()
        {
            List<Models.Product> result = ProductMapper(db.Products.ToList());
            return result;
        }

        private List<Models.Product> ProductMapper(List<Data.Product> productList)
        {
            var output = new List<Models.Product>();
            foreach (var item in productList)
            {
                output.Add(ProductMapper(item));
            }
            return output;
        }
        private Models.Product ProductMapper(Data.Product product)
        {
            var newProduct = new Models.Product()
            {
                ProductId = product.ProductId,
                ProductName = product.ProductName,
                ProductPrice = product.ProductPrice

            };
            return newProduct;
        }


        public Models.Product GetProductById(int? ID)
        {
            return ProductMapper(db.Products.Where(row => row.ProductId == ID).FirstOrDefault());
        }


        public bool SaveProduct(Models.Product product)
        {
            db.Products.Add(
                new Data.Product()
                {
                    ProductName = product.ProductName,
                    ProductPrice = product.ProductPrice

                });


            db.SaveChanges();
            return true;
        }

        public bool UpdateProduct(Models.Product product)
        {
            var existProduct = db.Products.FirstOrDefault(r => r.ProductId == product.ProductId);
            if (existProduct != null)
            {
                existProduct.ProductName = product.ProductName;
                existProduct.ProductPrice = product.ProductPrice;
                db.Products.Attach(existProduct);
                db.Entry(existProduct).State = System.Data.Entity.EntityState.Modified;

                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public bool DeleteProduct(int? ID)
        {
            var existProduct = db.Products.FirstOrDefault(r => r.ProductId == ID);
            if (existProduct != null)
            {

                db.Products.Remove(existProduct);
                db.Entry(existProduct).State = System.Data.Entity.EntityState.Deleted;
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }
    }
}

