from api.models import Food
from django.core import serializers
from django.http import JsonResponse
from utils.response_format_helper import successApi

def index(request):
    data = Food.objects.all()
    serialized = serializers.serialize('json',data)
    return successApi('success',serialized)
