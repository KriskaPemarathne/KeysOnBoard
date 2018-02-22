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
    public class CustomersController : Controller
    {
       // private readonly KeysOnBoardingEntities db = new KeysOnBoardingEntities();
        private readonly Core.CustomerCrudOperations custOp = new CustomerCrudOperations();

        public ActionResult Index()
        {
            var customers = custOp.GetAllCustomers();
            return View(customers);
        }
        // GET: Customer JSON
        public JsonResult GetAllCustomer()
        {
            var customers = custOp.GetAllCustomers();
            return Json(customers, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCustomerByID(int? id)
        {
            var customers = custOp.GetCustomerById(id);
            return Json(customers, JsonRequestBehavior.AllowGet);
        }



        // POST: Customer/Create
        [HttpPost]
        public ActionResult Create(Core.Models.Customer customer)
        {
            try
            {
                var valid = custOp.SaveCustomer(customer);
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

        [HttpPost]
        public JsonResult Edit(Core.Models.Customer customer)
        {
            try
            {
                var valid = custOp.UpdateCustomer(customer);
                return Json(new
                {
                    Valid = valid,
                    //StudentsPartial = studentPartialViewHtml
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    result = "Error occured"
                    //StudentsPartial = studentPartialViewHtml
                });
            }
        }


        //// GET: Customer/Delete/5
        //public ActionResult Delete(int id)
        //{
        //    return View();
        //}

        // POST: Customer/Delete/5
        [HttpPost]
        public JsonResult Delete(int? id)
        {
            try
            {
                // TODO: Add update logic here
                var Customers = custOp.DeleteCustomer(id);
                return Json(new
                {
                    result = "sucessfuly edited"

                    //StudentsPartial = studentPartialViewHtml
                });
            }
            catch
            {
                return Json(new
                {
                    result = "error occured"

                    //StudentsPartial = studentPartialViewHtml
                });
            }
        }
    }
    
}
