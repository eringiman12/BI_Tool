from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from main.views import EsteTestViewSet

router = DefaultRouter()
router.register(r'este', EsteTestViewSet, basename='este')

urlpatterns = [
    path('', include('main.urls')),
    path('admin/', admin.site.urls),
    path('api/este-list/', EsteTestViewSet.as_view(), name='este-list'),
    path('api/este-regist/', EsteTestViewSet.as_view(), name='este-register'),
    path('api/este-update/<int:pk>/', EsteTestViewSet.as_view(), name='este-update'),
    path('api/este-delete/<int:pk>/', EsteTestViewSet.as_view(), name='este-delete')
]