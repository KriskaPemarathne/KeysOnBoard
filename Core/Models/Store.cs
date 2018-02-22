using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Store
    {
        public int StoreId { get; set; }

        [Required]
        public string StoreName { get; set; }
        [Required]
        public string StoreAddress { get; set; }
    }
}
