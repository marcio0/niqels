from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect

from expenses.models import Entry, Category
from expenses.forms import EntryForm


@login_required()
def expense_list(request):
    user = request.user

    form = EntryForm()

    entries = Entry.objects.filter(user=user)

    context = {
        'entries': entries,
        'entry_form': form
    }

    return render(request, 'expenses/list.html', context)


@login_required()
def new_entry(request):
    user = request.user

    if request.method == 'POST':
        form = EntryForm(request.POST)
        form.user = user

        if form.is_valid():
            entry = form.save(commit=False)
            entry.user = user
            entry.save()

            return HttpResponseRedirect(reverse('entry_list'))

        else:
            entries = Entry.objects.filter(user=user)

            context = {
                'entries': entries,
                'entry_form': form
            }

            return render(request, 'expenses/list.html', context)
    else:
        return redirect('index')
