from django.shortcuts import render, redirect

from access.forms import UserCreationForm

def register(request):
    if request.user.is_authenticated():
        return redirect('index')

    if request.method == 'POST':
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('login')
    else:
        form = UserCreationForm()

    context = {
        'register_form': form
    }

    return render(request, 'access/register.html', context)
