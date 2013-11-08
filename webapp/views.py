from django.views.generic import TemplateView


class WebAppView(TemplateView):
    template_name="webapp/index.html"

    def get_context_data(self, **kwargs):
        context = super(WebAppView, self).get_context_data(**kwargs)
        if self.request.session.get('first_login', False):
            context['FIRST_LOGIN'] = self.request.session.pop('first_login')
            print context['FIRST_LOGIN']
        return context
