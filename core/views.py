from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from core.models import Entry, Category
from core.forms import EntryForm


@login_required()
def expense_list(request):
    if request.method == 'POST':
        form = EntryForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = EntryForm()

    entries = Entry.objects.all()

    context = {
        'entries': entries,
        'entry_form': form
    }

    return render(request, 'expenses/list.html', context)
