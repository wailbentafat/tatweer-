from django.db import models

class trucks (models.Model):
    
    truck_id = models.AutoField(primary_key=True)
    status = models.CharField(max_length=50, choices=[
        ('IN_TRANSIT', 'In Transit'),
        ('LOADING', 'Loading'),
        ('UNLOADING', 'Unloading'),
        ('MAINTENANCE', 'Maintenance'),
        ('IDLE', 'Idle')
    ])
    current_location = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    total_shipment = models.DecimalField(max_digits=10, decimal_places=2) 
    temperature = models.DecimalField(max_digits=5, decimal_places=2) 
    humidity = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"Truck {self.truck_id} - {self.status}"

    class Meta:
        verbose_name = "Truck"
        verbose_name_plural = "Trucks"

class Package(models.Model):
    package_id = models.AutoField(primary_key=True)
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    temperature = models.DecimalField(max_digits=5, decimal_places=2)
    humidity = models.DecimalField(max_digits=5, decimal_places=2)
    truck = models.ForeignKey(trucks, on_delete=models.CASCADE, related_name='packages')
    status = models.CharField(max_length=50, choices=[
        ('LOADED', 'Loaded'),
        ('UNLOADED', 'Unloaded'),
        ('IN_TRANSIT', 'In Transit'),
        ('DAMAGED', 'Damaged')
    ])

    def __str__(self):
        return f"Package {self.package_id} - {self.status}"

    class Meta:
        verbose_name = "Package"
        verbose_name_plural = "Packages"

