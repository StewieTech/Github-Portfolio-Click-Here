from django.shortcuts import render
import datetime


# Create your views here.

# now.month ==1 and now.day ==1

def index(request):
    now = datetime.datetime.now()
    return render(request, 'index.html', {
        "newyear": True
    })
