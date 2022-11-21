from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import WordDefinition
from .serializers import WordDefinitionSerializer

class WordDefinitionViewSet(viewsets.ModelViewSet):
    queryset = WordDefinition.objects.all()
    serializer_class = WordDefinitionSerializer
    # permission_classes = [permissions.IsAuthenticated]

