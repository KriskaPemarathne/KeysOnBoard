using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Data;
using Core.Models;
using Core;

namespace FirstVersion.Controllers
{
    public class ProductSoldsController : Controller
    {
        private readonly KeysOnBoardingEntities db = new KeysOnBoardingEntities();
        private readonly ProductSoldsCrudOperations productSoldCrudOp = new ProductSoldsCrudOperations();
        private readonly CustomerCrudOperations custCrudOp = new CustomerCrudOperations();
        private readonly ProductCrudOperations productCrudOp = new ProductCrudOperations();
        private readonly StoreCrudOperations storeCrudOp = new StoreCrudOperations();

        // GET: ProductSolds
        public ActionResult Index()
        {
            
            var sales = productSoldCrudOp.GetAllProductSolds();
            return View(sales);
        }

        // GET: ProductSolds/Details/5
        public ActionResult Details(int id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Core.Models.ProductSold sales = productSoldCrudOp.GetSalesByID(id);
            if (sales == null)
            {
                return HttpNotFound();
            }
            sales.Customer = custCrudOp.GetCustomerById(sales.CustomerId);
            sales.Store = storeCrudOp.GetStoreById(sales.StoreId);
            sales.Product = productCrudOp.GetProductById(sales.ProductId);
            return View(sales);
        }

        // GET: ProductSolds/Create
        public ActionResult Create()

        {
            var model = new Core.Models.ProductSold { };
            model.CustomerList = custCrudOp.GetAllCustomers();
            model.StoreList = storeCrudOp.GetAllStores();
            model.ProductList = productCrudOp.GetAllProducts();
            return View(model);
                     
        }

        // POST: ProductSolds/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ProductSoldId,ProductId,CustomerId,StoreId,SoldDate")] Core.Models.ProductSold productSoldViewModels)
        {
            var productSold = new Data.ProductSold();


            if (ModelState.IsValid)
            {
                try
                {
                    productSoldCrudOp.SaveProductSold(productSoldViewModels);
                    return RedirectToAction("Index");
                }
                catch
                {
                    return View();
                }

                
            }

            
            return View(productSold);
        }

        // GET: ProductSolds/Edit/5
        public ActionResult Edit(int? id)
        {
            var sales = productSoldCrudOp.GetSalesByID(id);

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            if (sales == null)
            {
                return HttpNotFound();
            }
            
            sales.CustomerList = custCrudOp.GetAllCustomers();
            sales.StoreList = storeCrudOp.GetAllStores();
            sales.ProductList = productCrudOp.GetAllProducts();
            return View(sales); ;
        }

        // POST: ProductSolds/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ProductSoldId,ProductId,CustomerId,StoreId,SoldDate")] Core.Models.ProductSold productSoldViewModels)
        {
            

            if (ModelState.IsValid)
            {
                try
                {
                    productSoldCrudOp.UpdateProductSold(productSoldViewModels);
                    return RedirectToAction(actionName: "Index");
                }
                catch
                {
                    return View();
                }


               
            }
           

            

            return View(productSoldViewModels);
        }

        // GET: ProductSolds/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Core.Models.ProductSold productSold = productSoldCrudOp.GetSalesByID(id);
            if (productSold == null)
            {
                return HttpNotFound();
            }
            else {
                productSold.Customer = custCrudOp.GetCustomerById(productSold.CustomerId);
                productSold.Store = storeCrudOp.GetStoreById(productSold.StoreId);
                productSold.Product = productCrudOp.GetProductById(productSold.ProductId);
            }
            return View(productSold);




        }

        // POST: ProductSolds/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public  ActionResult DeleteConfirmed(int id)
        {
           
           
            try
            {
                productSoldCrudOp.DeleteProductSold(id);
                return RedirectToAction(actionName: "Index");
            }
            catch
            {
                return View();
            }



        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
