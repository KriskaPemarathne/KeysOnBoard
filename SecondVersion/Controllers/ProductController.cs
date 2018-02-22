using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Core;
using Data;

namespace SecondVersion.Controllers
{
    public class ProductController : BaseController
    {
        private readonly KeysOnBoardingEntities db = new KeysOnBoardingEntities();
        private readonly ProductCrudOperations prodCrudOp = new ProductCrudOperations();
        // GET: Product
        public ActionResult Index()
        {
            var products = prodCrudOp.GetAllProducts();
            return View(products);
        }

        // GET: Product JSON
        /// <summary>
        /// Get all the products
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllProduct()
        {
            var products = prodCrudOp.GetAllProducts();
            return Json(products, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Get the product by the id
        /// </summary>
        /// <param name="id">Product Id</param>
        /// <returns></returns>
        public JsonResult GetProductByID(int? id)
        {
            var products = prodCrudOp.GetProductById(id);
            return Json(products, JsonRequestBehavior.AllowGet);
        }




        // POST: Product/Create
        /// <summary>
        /// Insert the product 
        /// </summary>
        /// <param name="product">Product object</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Create(Core.Models.Product product)
        {
            try
            {

                var valid = TryUpdateModel(product);
                if (valid)
                {
                    var products = prodCrudOp.SaveProduct(product);

                }
                return Json(new
                {
                    Valid = valid,
                    Errors = GetErrorsFromModelState(),

                });
            }
            catch
            {
                return View();
            }
        }



        // POST: Product/Edit/5
        /// <summary>
        /// Update the product 
        /// </summary>
        /// <param name="product">Product Object</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Edit(Core.Models.Product product)
        {
            try
            {
                var valid = TryUpdateModel(product);
                if (valid)
                {
                    var products = prodCrudOp.UpdateProduct(product);
                }

                return Json(new
                {
                    Valid = valid,
                    Errors = GetErrorsFromModelState(),

                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    result = "Error occured"

                });
            }
        }


        // POST: Product/Delete/5
        /// <summary>
        /// Delete the product 
        /// </summary>
        /// <param name="id">Product Id</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Delete(int? id)
        {
            try
            {

                var products = prodCrudOp.DeleteProduct(id);
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
