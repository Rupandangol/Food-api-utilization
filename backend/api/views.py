from api.models import Food
from django.core import serializers
from utils.response_format_helper import successApi, errorApi


def index(request):
    data = Food.objects.all()
    serialized = serializers.serialize('json', data)
    return successApi('validation', serialized)
