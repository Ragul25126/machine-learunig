"""API v1 Router — aggregates all algorithm endpoints."""

from fastapi import APIRouter
# from api.algorithms import linear_regression, kmeans, decision_tree

router = APIRouter()

# router.include_router(linear_regression.router, prefix="/linear-regression", tags=["Linear Regression"])
# router.include_router(kmeans.router, prefix="/kmeans", tags=["K-Means"])
# router.include_router(decision_tree.router, prefix="/decision-tree", tags=["Decision Tree"])
