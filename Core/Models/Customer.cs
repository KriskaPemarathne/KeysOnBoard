using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Customer
    {

        public int CustomerId { get; set; }

        [Required]
        public string CustomerName { get; set; }
        [Required]
        public string CustomerAddress { get; set; }
    }
}
