using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class ProductSoldDetails
    {

        public string StoreName { get; set; }
        public string ProductName { get; set; }
        public string CustomerName { get; set; }
        public decimal Amount { get; set; }
        public DateTime SoldDate { get; set; }
        public int ProductSoldId { get; set; }

        public ProductSold ProductSoldData { get; set; }// this is for v3
    }
}
