using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class StoreCrudOperations
    {
        private readonly KeysOnBoardingEntities db;
        public StoreCrudOperations()
        {
            db = new KeysOnBoardingEntities();
        }

        public List<Core.Models.Store> GetAllStores()
        {
            List<Models.Store> result = StoreMapper(db.Stores.ToList());
            return result;
        }

        private List<Models.Store> StoreMapper(List<Data.Store> storeList)
        {
            var output = new List<Models.Store>();
            foreach (var item in storeList)
            {
                output.Add(StoreMapper(item));
            }
            return output;
        }
        private Models.Store StoreMapper(Data.Store store)
        {
            var newStore = new Models.Store()
            {
                StoreId = store.StoreId,
                StoreName = store.StoreName,
                StoreAddress = store.StoreAddress

            };
            return newStore;
        }


        public Models.Store GetStoreById(int? id)
        {
            return StoreMapper(db.Stores.Where(row => row.StoreId == id).FirstOrDefault());
        }


        public bool SaveStore(Models.Store store)
        {
            db.Stores.Add(
                new Data.Store()
                {
                    StoreName = store.StoreName,
                    StoreAddress = store.StoreAddress

                });


            db.SaveChanges();
            return true;
        }

        public bool UpdateStore(Models.Store store)
        {
            var existStore = db.Stores.FirstOrDefault(s => s.StoreId == store.StoreId);
            if (existStore != null)
            {
                existStore.StoreName = store.StoreName;
                existStore.StoreAddress = store.StoreAddress;
                db.Stores.Attach(existStore);
                db.Entry(existStore).State = System.Data.Entity.EntityState.Modified;

                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public bool DeleteStore(int? id)
        {
            var existStore = db.Stores.FirstOrDefault(s => s.StoreId == id);
            if (existStore != null)
            {

                db.Stores.Remove(existStore);
                db.Entry(existStore).State = System.Data.Entity.EntityState.Deleted;
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }
    }

}
