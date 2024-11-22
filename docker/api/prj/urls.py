from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from main import views

router = DefaultRouter()
router.register(r'este', views.EsteViewSet, basename='este')
router.register(r'este-regist', views.EsteRegitSet, basename='este-register')

urlpatterns = [
    path('', include('main.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]