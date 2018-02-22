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
    public class ProductsController : Controller
    {
        private readonly KeysOnBoardingEntities db = new KeysOnBoardingEntities();
        private readonly ProductCrudOperations prodCrudOp = new ProductCrudOperations();

        // GET: Products
        public ActionResult Index()
        {
            List<Core.Models.Product> customers = prodCrudOp.GetAllProducts();
            return View(customers);
        }

        // GET: Products/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Core.Models.Product product = prodCrudOp.GetProductById(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // GET: Products/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Products/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ProductId,ProductName,ProductPrice")] Core.Models.Product prodCoreModels)
        {
            var product = new Data.Product();

            try
            {

                if (ModelState.IsValid)
                {

                    prodCrudOp.SaveProduct(prodCoreModels);
                    return RedirectToAction(actionName: "Index");
                }
                return View(product);
            }
            catch
            {
                return View();
            }


        }

        // GET: Products/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Core.Models.Product product = prodCrudOp.GetProductById(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // POST: Products/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ProductId,ProductName,ProductPrice")] Core.Models.Product productViewModels)
        {
            var product = new Data.Product();


            if (ModelState.IsValid)
            {
                prodCrudOp.UpdateProduct(productViewModels);
                return RedirectToAction("Index");
            }
            return View(product);
        }

        // GET: Products/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Core.Models.Product product = prodCrudOp.GetProductById(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // POST: Products/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            prodCrudOp.DeleteProduct(id);

            return RedirectToAction(actionName: "Index");
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
