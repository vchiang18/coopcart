from fastapi import APIRouter, Depends
from queries.manager import ManagerIn, ManagerOut, ManagerQueries

router = APIRouter()


@router.post("/manager/", response_model=ManagerOut)
def create_manager(manager: ManagerIn, repo: ManagerQueries = Depends()):
    return repo.create_manager(manager)


@router.get("/manager/{manager_id}", response_model=ManagerOut)
def get_manager(manager_id: int, repo: ManagerQueries = Depends()):
    return repo.get_manager(manager_id)


@router.put("/manager/{manager_id}", response_model=ManagerOut)
def update_manager(manager_id: int, manager: ManagerIn, repo: ManagerQueries = Depends()):
    return repo.update_manager(manager_id, manager)


@router.delete("/manager/{manager_id}", response_model=dict)
def delete_manager(manager_id: int, repo: ManagerQueries = Depends()):
    return repo.delete_manager(manager_id)
