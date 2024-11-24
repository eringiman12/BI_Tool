from rest_framework import serializers
from .models import Este

class EsteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Este
        fields = '__all__'
        
class EsteRegitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Este
        fields = ['name', 'address', 'date', 'cose']