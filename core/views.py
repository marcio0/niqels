from django.shortcuts import render, redirect

from core.models import Entry, Category
from core.forms import EntryForm

def expense_list(request):
    if request.method == 'POST':
        form = EntryForm(request.POST)
        if form.is_valid():
            form.save()

            return redirect('expense_list')

    else:
        form = EntryForm()

    entries = Entry.objects.all()

    context = {
        'entries': entries,
        'entry_form': form
    }

    return render(request, 'expenses/list.html', context)
