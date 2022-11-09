from django.db import models

class WordDefinition(models.Model):
  word = models.CharField(max_length=80)
  definition = models.TextField()