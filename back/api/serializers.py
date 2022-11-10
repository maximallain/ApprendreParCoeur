from rest_framework import serializers
from .models import WordDefinition

class WordDefinitionSerializer(serializers.ModelSerializer):
    class Meta:
        model=WordDefinition
        fields=["word", "definition"]