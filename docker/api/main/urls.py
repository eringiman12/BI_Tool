from django.urls import path
from . import views
from .db_process.regit import forms

urlpatterns = [
  # path("form", views.form, name="form"),
  path("form", forms.form, name="form"),
]