from rest_framework import serializers
from .models import Este_User

class EsteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Este_User
        fields = '__all__'
        
class EsteRegitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Este_User
        fields = ['name', 'address', 'date', 'cose']