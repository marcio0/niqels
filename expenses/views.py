from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from expenses.models import Entry, Category
from expenses.forms import EntryForm


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

    entries = Entry.objects.filter(user=user)

    context = {
        'entries': entries,
        'entry_form': form
    }

    return render(request, 'expenses/list.html', context)
