from rest_framework import serializers
from .models import trucks

class TruckSerializer(serializers.ModelSerializer):
    class Meta:
        model = trucks
        fields = [
            'truck_id',
            'status',
            'current_location',
            'destination', 
            'total_shipment',
            'temperature',
            'humidity'
        ]

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = [
            'package_id',
            'weight',
            'stock',
            'temperature',
            'humidity',
            'truck',
            'status'
        ]
        
        