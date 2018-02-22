using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Data;
using Core;

namespace ThirdVersion.Controllers
{
    public class ProductSoldsController : Controller
    {
        private readonly KeysOnBoardingEntities db = new KeysOnBoardingEntities();
        private readonly ProductSoldsCrudOperations productSoldCrudOp = new ProductSoldsCrudOperations();
        private readonly CustomerCrudOperations custCrudOp = new CustomerCrudOperations();
        private readonly ProductCrudOperations productCrudOp = new ProductCrudOperations();
        private readonly StoreCrudOperations storeCrudOp = new StoreCrudOperations();


        // GET: Sales
        public ActionResult Index()
        {
            return View();
        }
        // GET: Customers JSON

        /// <summary>
        /// Get all the customers and return a Json object
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllCustomers()
        {
            var data = custCrudOp.GetAllCustomers();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        // GET: Store JSON
        /// <summary>
        /// Get all the Store details and return a Json object
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllStores()
        {
            var data = storeCrudOp.GetAllStores();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Get all the Product details and return a Json object
        /// </summary>
        /// <returns></returns>
        // GET: Product JSON
        public JsonResult GetAllProducts()
        {
            var data = productCrudOp.GetAllProducts();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Get all the Sold Product details and return a Json object
        /// </summary>
        /// <returns></returns>
        public JsonResult GetSalesData()
        {
            var data = productSoldCrudOp.GetAllProductSolds();
            return Json(data, JsonRequestBehavior.AllowGet);
        }



        /// <summary>
        /// Get sals detail related to the given Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetSalesById(int? id)
        {
            var data = productSoldCrudOp.GetSalesByID(id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSalesDetailsById(int id)
        {

            var data = productSoldCrudOp.GetSalesByID(id);
            data.Customer = custCrudOp.GetCustomerById(data.CustomerId);
            data.Store = storeCrudOp.GetStoreById(data.StoreId);
            data.Product = productCrudOp.GetProductById(data.ProductId);
            return Json(data, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult Create(Core.Models.ProductSold sales)
        {
            try
            {
                var valid = TryUpdateModel(sales);
                if (valid)
                {
                    var data = productSoldCrudOp.SaveProductSold(sales);

                }
                return Json(new
                {
                    Valid = valid,
                   

                });
            }
            catch
            {
                return Json(new
                {
                    Valid = false,
                    

                });
            }
        }
        [HttpPost]
        public JsonResult Edit(Core.Models.ProductSold sales)
        {
            try
            {
                var valid = TryUpdateModel(sales);
                if (valid)
                {
                    var data = productSoldCrudOp.UpdateProductSold(sales);

                }
                return Json(new
                {
                    Valid = valid,
                    

                });
            }
            catch
            {
                return Json(new
                {
                    Valid = false,
                    

                });
            }
        }

        [HttpPost]
        public JsonResult Delete(int? id)
        {
            try
            {

                var sales = productSoldCrudOp.DeleteProductSold(id);
                return Json(new
                {
                    result = "sucessfuly edited"


                });
            }
            catch
            {
                return Json(new
                {
                    result = "error occured"


                });
            }
        }

    }
}
