from django.shortcuts import render
from .models import Este
from .serializers import EsteSerializer, EsteRegitSerializer
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.views import APIView

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
class EsteRegitSet(viewsets.ModelViewSet):  # 登録や更新処理を含む
    #  def post(self, request):
    #     serializer = EsteRegitSerializer(data=request.data)
    #     if serializer.is_valid():
    #         # serializer.save()  # データを保存
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # queryset = Este.objects.all()
    
    # def post(self, request):
    #     print(request)
    #     return EsteSerializer
    queryset = Este.objects.all()
    serializer_class = EsteRegitSerializer