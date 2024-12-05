from django.shortcuts import render
from .models import Este_User
from .serializers import EsteSerializer, EsteRegitSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.exceptions import NotFound

class EsteTestViewSet(APIView, LimitOffsetPagination):
  def get(self, request, pk=None):
    # # print(request)
    if pk is not None:
      # 特定のIDのデータを取得
      try:
        instance = Este_User.objects.get(id=pk)  # pkを使用
      except Este_User.DoesNotExist:
        raise NotFound(f"ID {pk} のレコードは存在しません。")
      serializer = EsteSerializer(instance)
      return Response(serializer.data)
      
    # 全データを取得
    queryset = Este_User.objects.all()

    # ページネーションを適用
    paginator = LimitOffsetPagination()  # ページネーターインスタンスを作成
    paginated_queryset = paginator.paginate_queryset(queryset, request, view=self)

    if paginated_queryset is not None:  # ページネートが成功した場合
        serializer = EsteSerializer(paginated_queryset, many=True)

    # データが存在しない場合のレスポンス
    serializer = EsteSerializer(queryset, many=True)
    return Response(serializer.data)
  
  def post(self, request):
    # データをシリアライズ
    serializer = EsteSerializer(data=request.data)
    
    # バリデーションを実行し、失敗した場合はエラーをスロー
    if serializer.is_valid(raise_exception=True):
        # 保存処理など
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def get_object(self, pk):
    try:
        return Este_User.objects.get(pk=pk)
    except Este_User.DoesNotExist:
        return None
    
  def put(self, request, pk):
    # get_objectメソッドで対象のオブジェクトを取得
    este = self.get_object(pk)
    
    # オブジェクトが存在しない場合
    if este is None:
        return Response({"error": "Not Found"}, status=status.HTTP_404_NOT_FOUND)

    # シリアライズとバリデーション
    serializer = EsteSerializer(este, data=request.data)
    if serializer.is_valid():
        serializer.save()  # 更新処理
        return Response(serializer.data)
    
    # バリデーションエラーがあれば返す
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, pk):
        # `pk`で指定されたオブジェクトを取得
        este = get_object_or_404(Este_User, pk=pk)

        # 削除処理
        este.delete()

        # 成功レスポンス
        return Response({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)