from django.urls import path

from . import views

urlpatterns = [
    path('food', views.index, name='index'),
]
