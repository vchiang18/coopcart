from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.brands import (BrandIn, BrandOut,
                            BrandQueries, Error)
from typing import Optional, Union, List


router = APIRouter()


# create brand
@router.post("/brand", response_model=BrandOut)
async def create(
    info: BrandIn,
    request: Request,
    response: Response,
    repo: BrandQueries = Depends()
):
    try:
        brand = repo.create(info)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot create a brand. Error: {str(e)}"
        )
    return brand


# list one brand
@router.get("/brands/{brand_id}", response_model=Optional[BrandOut])
async def get_brand(
    brand_id: int,
    response: Response,
    repo: BrandQueries = Depends()
):
    brand = repo.get_one(brand_id)
    if brand is None:
        response.status_code = 404
    return brand


# edit brand
@router.put("/brands/{brand_id}", response_model=Union[BrandOut, Error])
def update_brand(
    brand_id: int,
    brand: BrandIn,
    repo: BrandQueries = Depends()
):
    return repo.update(brand_id, brand)


# list brands
@router.get("/brands", response_model=Union[List[BrandOut], Error])
async def get_brands(
    response: Response,
    repo: BrandQueries = Depends()
):
    brands = repo.get_all()
    if brands is None:
        response.status_code = 404
    return brands


# delete brand
@router.delete("/brands/{brand_id}", response_model=bool)
def delete_brand(
    brand_id: int,
    repo: BrandQueries = Depends()
):
    return repo.delete(brand_id)
