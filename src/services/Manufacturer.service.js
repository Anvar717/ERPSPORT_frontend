import ApiService from './api.service'

const ManufacturerService = {
    GetAll(){
        return ApiService.get(`/Manufacturer/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Manufacturer/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/Manufacturer/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/Manufacturer/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Manufacturer/Delete?id=${id}`)
    },
    GetAllManufacturerCountry(ownerid) {
        return ApiService.get(`/Manufacturer/GetAllManufacturerCountry?ownerid=${ownerid}`)
    }
}
export default ManufacturerService