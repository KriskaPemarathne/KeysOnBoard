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
    public class CustomersController : Controller
    {
        private readonly KeysOnBoardingEntities db = new KeysOnBoardingEntities();
        private readonly Core.CustomerCrudOperations custOp = new CustomerCrudOperations();

        // GET: Customers

        public ActionResult Index()
        {
            List<Core.Models.Customer> customers = custOp.GetAllCustomers();
            return View(customers);
        }

        // GET: Customers/Details/5
        public ActionResult Details(int? id)
        {

            Core.Models.Customer customer = custOp.GetCustomerById(id);

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            if (customer == null)
            {
                return HttpNotFound();
            }
            return View(customer);
        }

        // GET: Customers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Customers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "CustomerId,CustomerName,CustomerAddress")] Core.Models.Customer custwModel)
        {
            var customer = new Data.Customer();
            
            try
            {

                if (ModelState.IsValid)
                {

                    custOp.SaveCustomer(custwModel);
                    return RedirectToAction(actionName: "Index");
                }
                return View(customer);
            }
            catch
            {
                return View();
            }
            //return View(customer);
        }

        // GET: Customers/Edit/5
        public ActionResult Edit(int? id)
        {

            Core.Models.Customer customer = custOp.GetCustomerById(id);

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            if (customer == null)
            {
                return HttpNotFound();
            }
            return View(customer);
        }

        // POST: Customers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "CustomerId,CustomerName,CustomerAddress")] Core.Models.Customer custwModel)
        {
            var customer = new Core.Models.Customer();

            if (ModelState.IsValid)
            {
                custOp.UpdateCustomer(custwModel);
                return RedirectToAction(actionName: "Index");
            }
            return View(customer);
        }

        // GET: Customers/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Core.Models.Customer customer = custOp.GetCustomerById(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            else {
                return View(customer);
            }
            
        }

        // POST: Customers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {


            try
            {
                custOp.DeleteCustomer(id);
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
