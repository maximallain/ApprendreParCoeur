from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WordDefinition
from .serializers import WordDefinitionSerializer

class WordDefinitionListApiView(APIView):
    # add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    # 1. List all
    def get(self, request, *args, **kwargs):
        word_definitions = WordDefinition.objects.all()
        serializer = WordDefinitionSerializer(word_definitions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):

        data = {
            'word': request.data.get('word'),
            'definition': request.data.get('definition'),
        }
        serializer = WordDefinitionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self, word_definition_id):
        try:
            return WordDefinition.objects.get(id=word_definition_id)
        except WordDefinition.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, word_definition_id, *args, **kwargs):
        word_definition_instance = self.get_object(word_definition_id)
        if not word_definition_instance:
            return Response(
                {"res": "Object with word definition id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = WordDefinitionSerializer(word_definition_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 4. Update
    def put(self, request, word_definition_id, *args, **kwargs):

        word_definition_instance = self.get_object(word_definition_id)
        if not word_definition_instance:
            return Response(
                {"res": "Object with word definition id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'word': request.data.get('word'), 
            'definition': request.data.get('definition'), 
        }
        serializer = WordDefinitionSerializer(instance = word_definition_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, word_definition_id, *args, **kwargs):
        word_definition_instance = self.get_object(word_definition_id)
        if not word_definition_instance:
            return Response(
                {"res": "Object with word definition id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        word_definition_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )