from django.db import models

class Food(models.Model):
    name = models.CharField(max_length=199)
    slug = models.SlugField(max_length=199,blank=True)
    description = models.TextField(blank=True)
    serialize_nutrition = models.TextField(blank=True)

    status = models.BooleanField(default=True)

    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name