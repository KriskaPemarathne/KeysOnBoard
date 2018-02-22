using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class ProductSold
    {
        public int ProductSoldId { get; set; }

      
          public DateTime SoldDate { get; set; }


        [Required(ErrorMessage = "Customer field required")]
        [Range(0, int.MaxValue, ErrorMessage = "Customer field required")]
        public int CustomerId { get; set; }


        [Required(ErrorMessage = "Store field required")]
        [Range(0, int.MaxValue, ErrorMessage = "Store field required")]
        public int StoreId { get; set; }


        [Required(ErrorMessage = "Product field required")]
        [Range(0, int.MaxValue, ErrorMessage = "Product field required")]
        public int ProductId { get; set; }


        //[DataType(DataType.Date)]
        //[Required, DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime Date { get; set; }



        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }



        public IEnumerable<Customer> CustomerList { get; set; }
        public IEnumerable<Store> StoreList { get; set; }
        public IEnumerable<Product> ProductList { get; set; }
        public ProductSoldDetails ProductSoldData { get; internal set; }
    }
}
