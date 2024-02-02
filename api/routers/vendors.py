from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.vendors import (VendorIn, VendorOut,
                            VendorQueries, Error)
from typing import Optional, Union, List

router = APIRouter()


#create vendor
@router.post("/vendor", response_model=VendorOut)
async def create(
    info: VendorIn,
    request: Request,
    response: Response,
    repo: VendorQueries = Depends()
):
    try:
        vendor = repo.create(info)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot create a vendor. Error: {str(e)}"
        )
    return vendor


#list one vendor
@router.get("/vendors/{vendor_id}", response_model=Optional[VendorOut])
async def get_vendor(
    vendor_id: int,
    response: Response,
    repo: VendorQueries = Depends()
):
    vendor = repo.get_one(vendor_id)
    if vendor is None:
        response.status_code = 404
    return vendor


#edit vendor
@router.put("/vendors/{vendor_id}", response_model=Union[VendorOut, Error])
def update_vendor(
    vendor_id: int,
    vendor: VendorIn,
    repo: VendorQueries = Depends()
):
    return repo.update(vendor_id, vendor)


#list vendors
@router.get("/vendors", response_model=Union[List[VendorOut], Error])
async def get_vendors(
    response: Response,
    repo: VendorQueries = Depends()
):
    vendors = repo.get_all()
    if vendors is None:
        response.status_code = 404
    return vendors


#delete vendor
@router.delete("/vendors/{vendor_id}", response_model=bool)
def delete_vendor(
    vendor_id: int,
    repo: VendorQueries = Depends()
):
    return repo.delete(vendor_id)
