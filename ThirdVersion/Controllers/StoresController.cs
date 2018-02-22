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
    public class StoresController : Controller
    {
        private readonly KeysOnBoardingEntities db = new KeysOnBoardingEntities();
        private readonly Core.StoreCrudOperations storeOp = new StoreCrudOperations();

        // GET: Store
        public ActionResult Index()
        {
            var stores = storeOp.GetAllStores();
            return View(stores);
        }
        // GET: Store JSON
        public JsonResult GetAllStore()
        {
            var Stores = storeOp.GetAllStores();
            return Json(Stores, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStoreByID(int? id)
        {
            var Stores = storeOp.GetStoreById(id);
            return Json(Stores, JsonRequestBehavior.AllowGet);
        }



        // GET: Store/Create
        public ActionResult Create()
        {
            return View();
        }


        // POST: Store/Create
        [HttpPost]
        public ActionResult Create(Core.Models.Store store)
        {
            try
            {

                var valid = TryUpdateModel(store);
                if (valid)
                {
                    var Stores = storeOp.SaveStore(store);

                }
                return Json(new
                {
                    Valid = valid,
                   

                });
            }
            catch
            {
                return View();
            }
        }

        // GET: Store/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Store/Edit/5
        [HttpPost]

        public JsonResult Edit(Core.Models.Store store)
        {
            try
            {
                var valid = TryUpdateModel(store);
                if (valid)
                {
                    var stores = storeOp.UpdateStore(store);
                }

                return Json(new
                {
                    Valid = valid,
                    

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




        // POST: Store/Delete/5
        [HttpPost]
        public JsonResult Delete(int? id)
        {
            try
            {

                var Stores = storeOp.DeleteStore(id);
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
