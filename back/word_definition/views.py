import json
from django.http import HttpResponse
from django.http import JsonResponse


from .models import WordDefinition

def index(request):
  all_words_definitions = WordDefinition.objects.all()
  definitions = [{"word":wd.word, "definition":wd.definition}for wd in all_words_definitions]

  return JsonResponse({"list":definitions})