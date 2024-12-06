from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from main.views import Este_User_Set, Este_Cose_set

router = DefaultRouter()
router.register(r'este', Este_User_Set, basename='este')

urlpatterns = [
    path('', include('main.urls')),
    path('admin/', admin.site.urls),
    path('api/este-list/', Este_User_Set.as_view(), name='este-list'),
    path('api/este-regist/', Este_User_Set.as_view(), name='este-register'),
    path('api/este-regist-cose/', Este_Cose_set.as_view(), name='este-register-cose'),
    path('api/este-update/<int:pk>/', Este_User_Set.as_view(), name='este-update'),
    path('api/este-delete/<int:pk>/', Este_User_Set.as_view(), name='este-delete'),
    path('api/este-userDetails/<int:pk>/', Este_User_Set.as_view(), name='este-userDetails')
]