from rest_framework import serializers
from .models import Este_User, Este_Course_Contents

class Este_User_Serializers(serializers.ModelSerializer):
    class Meta:
        model = Este_User
        fields = '__all__'
        
class Este_Course_Contents(serializers.ModelSerializer):
    class Meta:
        model = Este_Course_Contents
        fields = '__all__'
        
# class EsteRegitSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Este_User
#         fields = ['name', 'address', 'date', 'cose']