from django.db import models

class WordDefinition(models.Model):
    word = models.CharField(max_length=80)
    definition = models.TextField()
    updated = models.DateTimeField(auto_now = True, blank = True)


    def __str__(self):
        return self.word
