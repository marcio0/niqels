from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from core.models import Entry, Category
from core.forms import EntryForm


@login_required()
def expense_list(request):
    user = request.user

    if request.method == 'POST':
        form = EntryForm(request.POST)
        form.user = user

        if form.is_valid():
            entry = form.save(commit=False)
            entry.user = user
            entry.save()

            return redirect('index')
    else:
        form = EntryForm()

    entries = Entry.objects.all()

    context = {
        'entries': entries,
        'entry_form': form
    }

    return render(request, 'expenses/list.html', context)
