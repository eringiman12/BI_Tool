from django import forms
from ...models import Este
from django.shortcuts import render

def form(request):
  params = {}
  if(request.method == 'POST'):
    name = request.POST['name']
    address = request.POST['address']
    cose = request.POST['cose']
    obj = Este(
      name=name,
      address=address,
      cose=cose,
      date="2024-11-02"
    )
    obj.save()
  return render(request, 'main/form.html')