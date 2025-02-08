
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Package, trucks
from .serializers import PackageSerializer, TruckSerializer

class TruckViewSet(viewsets.ModelViewSet):
   
    queryset = trucks.objects.all()
    serializer_class = TruckSerializer
    

class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

