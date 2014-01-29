# encoding: utf-8

from django.utils.translation import ugettext_lazy, ugettext as _
from django.views.generic import TemplateView

def get_topic(topic_name):
    return '/%(module)s/%(topic_str)s/%(topic_name)s' % {
        'module': _(u'guia'),
        'topic_str': _(u'topico'),
        'topic_name': topic_name
    }


TOPICS = {
    _(u'Movimentações'): {
        'url': get_topic(_(u'movimentacoes')),
        'subtopics': {
            _(u'Criando sua primeira movimentação'): {
                'anchor': _(u'primeira-movimentacao')
            },

            _(u'Editando uma movimentação'): {
                'anchor': _(u'editando-movimentacao')
            }
        }
    },

    _(u'Relatórios'): {
        'url': get_topic(_(u'relatorios')),
        'subtopics': {
            _(u'Balanço'): {
                'anchor': _(u'balanco')
            },

            _(u'Top categorias'): {
                'anchor': _(u'top-categorias')
            },

            _(u'Comparação de categorias'): {
                'anchor': _(u'comparacao')
            }

        }
    }

}


class GuideIndex(TemplateView):
    template_name = 'guide/guide_base.html'

    def get_context_data(self, **kwargs):
        context = super(GuideIndex, self).get_context_data(**kwargs)

        context['topics'] = TOPICS

        return context
