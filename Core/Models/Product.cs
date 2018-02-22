using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Product
    {
        public int ProductId { get; set; }

        [Required]
        public string ProductName { get; set; }
        [Required]
        public Nullable<decimal> ProductPrice { get; set; }
    }
}
