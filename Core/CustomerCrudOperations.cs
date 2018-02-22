using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data;
using System.Net;
using Core.Models;

namespace Core
{
    public class CustomerCrudOperations
    {
       
        private readonly KeysOnBoardingEntities db ;
        public CustomerCrudOperations()
        {
            db = new KeysOnBoardingEntities();
        }

        public List<Core.Models.Customer> GetAllCustomers()
        {
            List<Models.Customer> result = CustomerMapper(db.Customers.ToList());
            return result;
        }

        private List<Models.Customer> CustomerMapper(List<Data.Customer> productList)
        {
            var output = new List<Models.Customer>();
            foreach (var item in productList)
            {
                output.Add(CustomerMapper(item));
            }
            return output;
        }
        private Models.Customer CustomerMapper(Data.Customer customer)
        {
            var newCustomer = new Models.Customer()
            {
                CustomerId = customer.CustomerId,
                CustomerName = customer.CustomerName,
                CustomerAddress = customer.CustomerAddress

            };
            return newCustomer;
        }


        public Models.Customer GetCustomerById(int? ID)
        {
            return CustomerMapper(db.Customers.Where(row => row.CustomerId == ID).FirstOrDefault());
        }


        public bool SaveCustomer(Models.Customer customer)
        {
            db.Customers.Add(
                new Data.Customer()
                {
                    CustomerName = customer.CustomerName,
                    CustomerAddress = customer.CustomerAddress

                });
            

            db.SaveChanges();
            return true;
        }

        public bool UpdateCustomer(Models.Customer customer)
        {
            var existCustomer = db.Customers.FirstOrDefault(r => r.CustomerId == customer.CustomerId);
            if (existCustomer != null)
            {
                existCustomer.CustomerName = customer.CustomerName;
                existCustomer.CustomerAddress = customer.CustomerAddress;
                db.Customers.Attach(existCustomer);
                db.Entry(existCustomer).State = System.Data.Entity.EntityState.Modified;

                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public bool DeleteCustomer(int? ID)
        {
            var existCustomer = db.Customers.FirstOrDefault(r => r.CustomerId == ID);
            if (existCustomer != null)
            {

                db.Customers.Remove(existCustomer);
                db.Entry(existCustomer).State = System.Data.Entity.EntityState.Deleted;
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }
    }
}
