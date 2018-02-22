using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class ProductSoldsCrudOperations
    {

        private readonly KeysOnBoardingEntities db;
        public ProductSoldsCrudOperations()
        {
            db = new KeysOnBoardingEntities();
        }


       
        public List<Core.Models.ProductSoldDetails> GetAllProductSolds()
        {
            var data = db.ProductSolds.Select(d => new Models.ProductSoldDetails()
            {
                 ProductSoldId=d.ProductSoldId,
                ProductName = d.Product.ProductName,
                StoreName = d.Store.StoreName,
                Amount = (decimal)d.Product.ProductPrice,
                CustomerName = d.Customer.CustomerName,
                SoldDate = (DateTime)d.SoldDate,
                ProductSoldData = new Models.ProductSold()
                {
                    CustomerId = (int)d.CustomerId,
                    ProductSoldId = d.ProductSoldId,
                    ProductId = (int)d.ProductId,
                    StoreId = (int)d.StoreId,
                    SoldDate = (DateTime)d.SoldDate
                }
            }).ToList();
            return data;
        }



        public Core.Models.ProductSold GetSalesByID(int? id)
        {

            var data = db.ProductSolds.Where(r => r.ProductSoldId == id).Select(row => new Core.Models.ProductSold()
            {
                CustomerId = (int)row.CustomerId,
                SoldDate = (DateTime)row.SoldDate,
                ProductSoldId = (int)row.ProductSoldId,
                ProductId = (int)row.ProductId,
                StoreId = (int)row.StoreId,
               

            }).FirstOrDefault();
            return data;
        }




        public bool SaveProductSold(Models.ProductSold productSold)
        {
            db.ProductSolds.Add(
                new Data.ProductSold()
                {
                    ProductId = productSold.ProductId,
                    StoreId = productSold.StoreId,
                    SoldDate = productSold.SoldDate,
                    CustomerId = productSold.CustomerId

                });


            db.SaveChanges();
            return true;
        }


          

        public bool UpdateProductSold(Models.ProductSold productSold)
        {
            var existProductSold = db.ProductSolds.FirstOrDefault(r => r.ProductSoldId == productSold.ProductSoldId);
            if (existProductSold != null)
            {
                existProductSold.CustomerId = productSold.CustomerId;
                existProductSold.ProductId = productSold.ProductId;
                existProductSold.StoreId = productSold.StoreId;
                existProductSold.SoldDate = productSold.SoldDate;
                db.ProductSolds.Attach(existProductSold);
                db.Entry(existProductSold).State = System.Data.Entity.EntityState.Modified;

                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public bool DeleteProductSold(int? ID)
        {
            var existProductSold = db.ProductSolds.FirstOrDefault(r => r.ProductSoldId == ID);
            if (existProductSold != null)
            {

                db.ProductSolds.Remove(existProductSold);
                db.Entry(existProductSold).State = System.Data.Entity.EntityState.Deleted;
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }
    }
}
