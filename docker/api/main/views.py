from django.shortcuts import render
from .models import Este
from .serializers import EsteSerializer
from rest_framework import viewsets

# Create your views here.
def index(request):
  content = {
  'message': 'こんにちは！Djangoテンプレート！'
  }
  return render(request, 'main/index.html', content)


def form(request):
  params = {}
  if(request.method == 'POST'):
    name = request.POST['name']
    params = {
      'name': name,
    }
  return render(request, 'main/form.html', params)

class EsteViewSet(viewsets.ModelViewSet):
    queryset = Este.objects.all()
    serializer_class = EsteSerializer