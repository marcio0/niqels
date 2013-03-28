from django.shortcuts import render

from core.models import Entry

def expense_list(request):
    entries = Entry.objects.all()

    context = {'entries': entries}

    return render(request, 'expenses/list.html', context)
