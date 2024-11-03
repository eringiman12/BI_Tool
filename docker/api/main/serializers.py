from rest_framework import serializers
from .models import Este

class EsteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Este
        fields = '__all__'