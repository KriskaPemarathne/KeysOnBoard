using Core;
using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SecondVersion.Controllers
{
    public class CustomerController : BaseController
    {

        private readonly KeysOnBoardingEntities db = new KeysOnBoardingEntities();
        private readonly Core.CustomerCrudOperations custOp = new CustomerCrudOperations();


        // GET: Customer
        /// <summary>
        /// Get the cusomer details
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            var customers = custOp.GetAllCustomers();
            return View(customers);
        }

        // GET: Customer JSON
        /// <summary>
        /// Get the Customer detals in to a json object
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllCustomer()
        {
            var customers = custOp.GetAllCustomers();
            return Json(customers, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Get the customer  details by Id
        /// </summary>
        /// <param name="id">Customer id</param>
        /// <returns></returns>
        public JsonResult GetCustomerByID(int? id)
        {
            var customers = custOp.GetCustomerById(id);
            return Json(customers, JsonRequestBehavior.AllowGet);
        }

        // GET: Customer/Details/5
        /// <summary>
        ///Get the customer details by id
        /// </summary>
        /// <param name="id">Customer id</param>
        /// <returns></returns>
        public JsonResult Details(int id)
        {
            var customers = custOp.GetCustomerById(id);
            return Json(customers, JsonRequestBehavior.AllowGet);
        }

        // POST: Customer/Create
        /// <summary>
        /// Create a new customer
        /// </summary>
        /// <param name="customer">Customer object with the inserted data</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Create(Core.Models.Customer customer)
        {
            try
            {
                
                var valid = TryUpdateModel(customer);
                if (valid)
                {
                    var customers = custOp.SaveCustomer(customer);

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
        
        // POST: Customer/Edit/5
        /// <summary>
        /// Update the Customer with the given details 
        /// </summary>
        /// <param name="customer">Customer Object with update detals</param>
        /// <returns></returns>
        [HttpPost]

        public JsonResult Edit(Core.Models.Customer customer)
        {
            try
            {
                var valid = TryUpdateModel(customer);
                if (valid)
                {
                    var customers = custOp.UpdateCustomer(customer);
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
        
        // POST: Customer/Delete/5
        /// <summary>
        /// Delete the customer related to the given Customer Id
        /// </summary>
        /// <param name="id">Customer Id</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Delete(int? id)
        {
            try
            {

                var customers = custOp.DeleteCustomer(id);
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