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
    public class StoresController : Controller
    {
        private readonly KeysOnBoardingEntities db = new KeysOnBoardingEntities();
        private readonly StoreCrudOperations storeCrudOp = new StoreCrudOperations();

        // GET: Stores
        public ActionResult Index()
        {
            List<Core.Models.Store> store = storeCrudOp.GetAllStores();
            return View(store);
        }

        // GET: Stores/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Core.Models.Store store = storeCrudOp.GetStoreById(id);
            if (store == null)
            {
                return HttpNotFound();
            }
            return View(store);
        }

        // GET: Stores/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Stores/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "StoreId,StoreName,StoreAddress")] Core.Models.Store storeViewModels)
        {
            var store = new Data.Store();


            try {
                if (ModelState.IsValid)
                {
                    storeCrudOp.SaveStore(storeViewModels);
                    return RedirectToAction("Index");
                }
                return View(store);

            } catch {
                return View();
            }
            

           
        }

        // GET: Stores/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Core.Models.Store store = storeCrudOp.GetStoreById(id);
            if (store == null)
            {
                return HttpNotFound();
            }
            return View(store);
        }

        // POST: Stores/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "StoreId,StoreName,StoreAddress")] Core.Models.Store storeViewModels)
        {
            var store = new Core.Models.Store();

            if (ModelState.IsValid)
            {
                storeCrudOp.UpdateStore(storeViewModels);
                return RedirectToAction("Index");
            }
            return View(store);
        }

        // GET: Stores/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Core.Models.Store store = storeCrudOp.GetStoreById(id);
            if (store == null)
            {
                return HttpNotFound();
            }
            return View(store);
        }

        // POST: Stores/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            try
            {
                storeCrudOp.DeleteStore(id);
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
